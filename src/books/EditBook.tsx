import { useNavigate, useParams } from "react-router-dom";
import { bookCreationDTO, BookPutGetDTO } from "./book.model";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { PutBook, PutGetBook } from "../endpoints";
import { convertBookToFormData } from "../utilities/formDataUtility";
import BookForm from "./BookForm";

export default function EditBook()
{
    const {id}: any = useParams();
    const [book, setBook] = useState<bookCreationDTO>();

    const [bookPutGet, setBookPutGet] = useState<BookPutGetDTO>();
    const navigate = useNavigate();
    

    useEffect(() => {
        axios.get(`${PutGetBook}/${id}`)
            .then((response: AxiosResponse<BookPutGetDTO>) => {
              
                const model: bookCreationDTO = {
                    title: response.data.book.title,
                    isAvailable: response.data.book.isAvailable,                   
                    coverUrl: response.data.book.cover,
                    summary: response.data.book.summary,
                    publishedDate: new Date(response.data.book.publishedDate)
                };
                 console.log(model);
                 console.log(response.data);
                setBook(model);
                setBookPutGet(response.data);
            })
    }, [id]);

    async function edit(bookToEdit: bookCreationDTO){
        try {
            const formData = convertBookToFormData(bookToEdit);
            await axios({
                method: 'put',
                url: `${PutBook}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            navigate(`/book/${id}`);
        }
        catch (error){
           console.log(error);
        }
    }

    return (
        <>
            <h3>Edit Book</h3>
            
            {book && bookPutGet ? <BookForm model={book}
                onSubmit={async values => await edit(values)}
                nonSelectedCategories={bookPutGet.unSelectedCategories}
                selectedCategories={bookPutGet.selectedCategories}

                nonSelectedBookshops={bookPutGet.unSelectedBookShop}
                selectedBookshops={bookPutGet.selectedBookShop}

                nonSelectedAuthors={bookPutGet.unSelectedAuthors}
                selectedAutors={bookPutGet.selectedAuthors}


              

            /> : <span>Loading......</span>}
            
        </>
    )
}