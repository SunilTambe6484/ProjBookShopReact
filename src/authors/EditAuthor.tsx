import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { authorCreationDTO, authorDTO } from "./authors.model";
import axios from "axios";
import { editAuthorUrl, getAuthorUrl } from "../endpoints";
import AuthorForm from "./AuthorForm";


export default function EditAuthor()
{
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<authorCreationDTO | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get<authorDTO>(`${getAuthorUrl}/${id}`);
       

        const authorData: authorCreationDTO = {
            name: response.data.name,
            biography: response.data.biography,
          dateOfBirth: new Date(response.data.dateofBirth),// Convert to en-US format
                   
            pictureURL: response.data.picture,
          };
          console.log(authorData);
          setAuthor(authorData);
       
      } catch (error) {
        console.error("Error fetching author:", error);
        alert("An error occurred while fetching the author details.");
      }
    };

    fetchAuthor();
  }, [id]);

  const handleSubmit = async (values: authorCreationDTO) => {
    try {
      console.log("Updating Author:", values);

     
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.biography) formData.append("biography", values.biography);
      if (values.dateOfBirth)
        formData.append("dateOfBirth", values.dateOfBirth.toISOString());
      if (values.picture) formData.append("picture", values.picture);

     
      const response = await axios.put(
        `${editAuthorUrl}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Author updated successfully:", response.data);
      alert("Author updated successfully!");
    } catch (error) {
      console.error("Error updating author:", error);
      alert("An error occurred while updating the author.");
    }
  };

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Author</h2>{author &&
      <AuthorForm model={author} onSubmit={handleSubmit} />
}
    </div>
  );
}