import axios from "axios";
import { bookDTO } from "./book.model";
import { DeleteBook } from "../endpoints";
import { Link } from "react-router-dom";
import LoadContext from "../utilities/LoadContext";
import { useContext } from "react";
import Authorized from "../auth/Authorized";
import Button from "../utilities/Button";
import customConfirm from "../utilities/customConfirm";
import css from './SingleBook.module.css';

export default function BookDetails(props:bookDTO)
{
    const buildLink = () => `/BookDetails/${props.id}`
    const loadContext = useContext(LoadContext);

    function deleteBook() {
        axios.delete(`${DeleteBook}/${props.id}`)
            .then(() => {
              loadContext();
            });
    }

    return (
        
        <div className={css.div}>
            <Link to={buildLink()}>
                 <img alt="cover" src={props.cover} />
             </Link>
             <p>
                 <Link to={buildLink()}>{props.title}</Link>
             </p>
             <Authorized
                 role="Admin"
                 authorized={<>
                     <div>
                         <Link style={{ marginRight: '1rem' }} className="btn btn-info"
                            to={`/book/edit/${props.id}`}
                         >Edit</Link> 
                         <Button disabled={false} type="button"
                             onClick={() => customConfirm(() => deleteBook())}
                             className="btn btn-danger"
                         >Delete</Button>
                     </div>
                 </>}
             />

         </div>
    )
}