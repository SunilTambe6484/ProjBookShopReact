import { useNavigate } from "react-router-dom";
import AuthorForm from "./AuthorForm";
import { authorCreationDTO } from "./authors.model";
import { FormikHelpers } from "formik";
import { postAuthorUrl } from "../endpoints";
import axios from "axios";


export default function CreateAuthor()
{
    const navigate = useNavigate(); 

    const handleSubmit = async (
      values: authorCreationDTO,
      actions: FormikHelpers<authorCreationDTO> 
    ) => {
     
        try {
            console.log("Creating Author:", values);
        
            // Create FormData object
            const formData = new FormData();
            formData.append("name", values.name);
            if (values.biography) formData.append("biography", values.biography);
            if (values.dateOfBirth)
              formData.append("dateOfBirth", values.dateOfBirth.toISOString());
            if (values.picture) formData.append("picture", values.picture);
        
            // Send the form data to the server
            const response = await axios.post(
              postAuthorUrl,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
        
            console.log("Author created successfully:", response.data);
            navigate("/");
          } catch (error) {
            console.error("Error creating author:", error);
          }
    };
  
    const initialModel: authorCreationDTO = { name: "",biography:"",dateOfBirth:undefined }; 
  
    return (
      <div>
        <h2>Create a New Category</h2>
        <AuthorForm model={initialModel} onSubmit={handleSubmit} />
      </div>
    );
}