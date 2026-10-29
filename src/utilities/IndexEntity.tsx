import axios, { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";

export default function IndexEntity<T>(props:indexEntityProps<T>){
    const [entities,setEntities] =  useState<T[] |  undefined>(undefined);
    const [totalAmountOfPages,setTotalAmountofPages] =  useState(0);
    const [recordPerpage,setRecordsperPage] =  useState(5);
    const [page,setPage] =  useState(1);

    useEffect(()=>{
        fetchData();
    },[page,recordPerpage]);

    function fetchData()
    {
        axios.get<T[]>(props.url,{
            params:{page,recordPerpage}
        })
        .then((response:AxiosResponse<T[]>)=>{
            const totalAmountOfRecords =  parseInt(response.headers['totalamountofrecords'],10);
            setTotalAmountofPages(Math.ceil(totalAmountOfRecords/recordPerpage));
            setEntities(response.data);

        })
    }  // End of fetch function

    async function deleteEntity(id: number) {
        try {
            await axios.delete(`${props.url}/${id}`);
            fetchData();
        }
        catch (error) {
            console.log(error);
        }
    }

    const buttons = (editUrl: string, id: number) => <>
    <Link className="btn btn-success"
        to={editUrl}>Edit</Link>

    <Button type="button" className="btn btn-danger" disabled={false}
        onClick={() => customConfirm(() => deleteEntity(id))}
        >Delete</Button>
</>
    return (
        <>
        <h2>{props.title}</h2>
        {props.createURL?<Link className="btn btn-primary" to={props.createURL}>Create {props.entityName}</Link> :  null}
        
        <Pagination radius={3} currentPage={page} totalAmountofPages={totalAmountOfPages} onChange={newPage=>setPage(newPage)}/>
        
        <GenericList list={entities}>
                <table className="table table-striped">
                    {props.children(entities!, buttons)}
                </table>
            </GenericList>
        </>
    )

// <div>Hello</div>
}
interface indexEntityProps<T>
{
entityName:string;
url:string;
title:string;
createURL:string;
children(entities: T[],
    buttons: (editUrl: string, id: number) => ReactElement): ReactElement;
}