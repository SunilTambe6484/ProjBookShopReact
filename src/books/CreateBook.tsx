import { useEffect, useState } from "react";
import { categoryDTO } from "../categories/categories.model";
import { useNavigate } from "react-router-dom";
import { bookShopDTO } from "../bookshops/bookShops.model";
import { authorDTO } from "../authors/authors.model";
import axios, { AxiosResponse } from "axios";
import { getBookRealtedEntities, PostBook } from "../endpoints";
import { bookCreationDTO, BookPostGetDTO } from "./book.model";
import { convertBookToFormData } from "../utilities/formDataUtility";
import BookForm from "./BookForm";


export default function CreateBook()
{
    const [nonSelectedCategories, setNonSelectedCategories] = useState<categoryDTO[]>([]);
    const [nonSelectedBookShops, setNonSelectedBookShops] = useState<bookShopDTO[]>([]);
    const [nonSelectedAuthor, setNonSelectedAuthor] = useState<authorDTO[]>([]);
    

    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${getBookRealtedEntities}`)
            .then((response: AxiosResponse<BookPostGetDTO>) => {
                setNonSelectedCategories(response.data.categories);
                setNonSelectedBookShops(response.data.bookShops);
                setNonSelectedAuthor(response.data.authors);
                setLoading(false);
            })
    }, [])

    async function create(book: bookCreationDTO){
        try{
            console.log(book);
            const formData = convertBookToFormData(book);
             await axios({
                method: 'post',
                url: PostBook,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })

            navigate(`/`);

        } 
        catch(error)
        {
console.log(error);
        }
    }

    return (
        <>
            <h3>Create Book</h3>
          
            {loading ? <span>Loading...........</span> :

                <BookForm model={{ title: '', isAvailable: false,summary:''}}
                    onSubmit={ async values => await create(values)}
                    nonSelectedCategories={nonSelectedCategories}
                    selectedCategories={[]}

                    nonSelectedAuthors={nonSelectedAuthor}
                    selectedAutors={[]}

                    nonSelectedBookshops={nonSelectedBookShops}
                    selectedBookshops={[]}
                 
                />}
        </>
    )
}