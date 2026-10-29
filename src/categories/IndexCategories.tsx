import axios from "axios";
import { useEffect, useState } from "react"
import { categoryDTO } from "./categories.model";
import { Link } from "react-router-dom";
import { getCategoryURL } from "../endpoints";

export default function IndexCategories()
{
    const [categories,setCategories] = useState<categoryDTO[]>([]);
    const [loading,setLoading] =  useState(true);
    const [error,setError] =  useState< string| null>(null)

    useEffect(()=>{
       fetchCategories();
    },[]);

   async  function fetchCategories()
    {
        try{
            const response =  await axios.get<categoryDTO[]>(getCategoryURL);
            setCategories(response.data);
            setLoading(false);        
        }
        catch(err)
        {
            console.error(err);
            setError("Failed to fetch Categories");
            setLoading(false);
        }

    };
    if(loading) return <p>Loading Categories......</p>
    if(error) return <p>Error in fetched category</p>

    return (
        <>
        <h2>Category List</h2>
        <Link to={"/categories/create"} className="btn btn-primary">Create New Category</Link>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>
                        ID
                    </th>
                    <th>
                        Name
                    </th>
                    <th>
                    Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category)=>
                (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>

                     <Link to={`/categories/edit-category/${category.id}`}
                     className="btn btn-primary">Edit</Link>

                    </td>
                  </tr>

                ))}
            </tbody>
        </table>
        </>
    )
}