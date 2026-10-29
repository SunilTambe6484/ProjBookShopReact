//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookShopCreationDTO } from "./bookShops.model";
import axios from "axios";
import { postbookShopUrl } from "../endpoints";
import BookShopForm from "./BookShopForm";

export default function CreateBookShop()
{
    const navigate = useNavigate();
    // const [errors, setErrors] = useState<string[]>([]);

    async function create(bookShop: bookShopCreationDTO){
        try {
            await axios.post(postbookShopUrl, bookShop);
           navigate("/bookshops");
        }
        catch(error){
         console.log(error);
        }
    }
const initialBookShop:bookShopCreationDTO={
    name: '',
    latitude: 0,
    longitude: 0
}
    return (
        <>
            <h3>Create Book Shop</h3>
            
            <BookShopForm 
                model={initialBookShop}
                onSubmit={async values => await create(values)}
            />
        </>
    )
}