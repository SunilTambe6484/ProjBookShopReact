import axios from "axios";
import { categoryCreationDTO } from "./categories.model";
import CategoryForm from "./CategoryForm";
//import { postCategoryURL } from "../endpoints";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { postCategoryURL } from "../endpoints";
//import { useState } from "react";

export default function CreateCategory()
{
    const navigate = useNavigate(); 

  const handleSubmit = async (
    values: categoryCreationDTO,
    actions: FormikHelpers<categoryCreationDTO> 
  ) => {
   
    try {
     
      const response = await axios.post(
        postCategoryURL,
        values
      );
      console.log("Category created successfully:", response.data);
      actions.setSubmitting(false); 
      navigate("/"); 
    } catch (err) {
      console.error("Error creating category:", err);
      actions.setSubmitting(false); 
    }
  };

  const initialModel: categoryCreationDTO = { name: "" }; 

  return (
    <div>
      <h2>Create a New Category</h2>
      <CategoryForm model={initialModel} onSubmit={handleSubmit} />
    </div>
  );
}
