import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { categoryCreationDTO } from "./categories.model";
import axios, { AxiosResponse } from "axios";
import { editCategoryUrl, getCategoryURL } from "../endpoints";
import CategoryForm from "./CategoryForm";
import { FormikHelpers } from "formik";

export default function EditCategory()
{
    const {id}:any =  useParams();
    const navigate =  useNavigate();
    const [category , setCategory] =  useState<categoryCreationDTO | null>(null);
    const [loading,setloading] =  useState(true);
    const [error,setError] =  useState<string |  null>(null);


    useEffect(()=>{
     const fetchCategory= async ()=>{
        try{
            const response =  await axios.get<categoryCreationDTO>(`${getCategoryURL}/${id}`);
            setCategory(response.data);
            setloading(false);

        }catch(err){
            console.error(err);
            setError("Failed to fetch category details");
            setloading(false);
        }
     };
     fetchCategory();
    },[id]);

const handleSubmit =  async(
    values:categoryCreationDTO,
    actions:FormikHelpers<categoryCreationDTO>)=>{
try{
    await axios.put(`${editCategoryUrl}/${id}`,values);
    console.log("category updated successfully",values);
    actions.setSubmitting(false);
    navigate("/");


} catch(err){
    console.error("Error updating category",err);
    actions.setSubmitting(false);
}
};
if(loading) return <p>loading......</p>
if(error) return <p className="text-danger">{error}</p>

    return (
        <>
        <div className="row">
            <h2>Edit category</h2>
        
        {category && <CategoryForm model={category} onSubmit={handleSubmit} /> }
        </div>
        </>
    )
}