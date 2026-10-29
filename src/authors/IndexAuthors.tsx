//import { useEffect, useState } from "react";
import { authorDTO } from "./authors.model";
import { getAuthorUrl } from "../endpoints";
//import axios from "axios";
//import { Link } from "react-router-dom";
import IndexEntity from "../utilities/IndexEntity";



export default function IndexAuthors() {
    return (
        <IndexEntity<authorDTO>
            url={getAuthorUrl} createURL='/authors/create' title="Authors"
            entityName="Author"
        >
            {(authors, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {authors?.map(author => <tr key={author.id}>
                        <td>
                            {buttons(`/authors/edit-author/${author.id}`, author.id)}
                        </td>
                        <td>
                            {author.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}

















// export default function IndexAuthors()
// {
    
//     const [authors,setAuthors] = useState<authorDTO[]>([]);
//     const [loading,setLoading] =  useState(true);
//     const [error,setError] =  useState< string| null>(null)

//     useEffect(()=>{
//        fetchAuthors();
//     },[]);

//    async  function fetchAuthors()
//     {
//         try{
//             const response =  await axios.get<authorDTO[]>(getAuthorUrl);
//             setAuthors(response.data);
//             setLoading(false);        
//         }
//         catch(err)
//         {
//             console.error(err);
//             setError("Failed to fetch Authors");
//             setLoading(false);
//         }

//     };
//     if(loading) return <p>Loading Authors......</p>
//     if(error) return <p>Error in fetched Author</p>

//     return (
//         <>
//         <h2>Author List</h2>
//         <Link to={"/authors/create"} className="btn btn-primary">Create New Author</Link>
//         <table className="table table-striped">
//             <thead>
//                 <tr>
//                     <th>
//                         ID
//                     </th>
//                     <th>
//                         Name
//                     </th>
                  
//                     <th>
//                     Actions
//                     </th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {authors.map((author)=>
//                 (
//                   <tr key={author.id}>
//                     <td>{author.id}</td>
//                     <td>{author.name}</td>
//                     <td>

//                      <Link to={`/authors/edit-author/${author.id}`}
//                      className="btn btn-primary">Edit</Link>

//                     </td>
//                   </tr>

//                 ))}
//             </tbody>
//         </table>
//         </>
//     )
// }