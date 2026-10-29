import GenericList from "../utilities/GenericList";
import { bookDTO } from "./book.model";

import css from './BookList.module.css';
import SingleBook from "./SingleBook";


export default function BookList(props:booksListProps)
{
    return <GenericList 
    list={props.books}>
        <div className={css.div}>
            
            {props.books?.map(book =>
                <SingleBook {...book} key={book.id} />)}
        </div>
    </GenericList>
}
interface booksListProps {
    books?: bookDTO[];
}