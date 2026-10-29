import React, { useEffect, useState } from 'react'
import { bookDTO } from '../books/book.model';
import axios, { AxiosResponse } from 'axios';
import { bookEndpoint } from '../endpoints';
import LoadContext from '../utilities/LoadContext';
import BookList from '../books/BookList';

export default function Home()
{
    const [books, setBooks] = useState<bookDTO[]>([]);

    useEffect(() => {
      loadData();
    }, []);
  
    function loadData() {
      axios.get(bookEndpoint).then((response: AxiosResponse<bookDTO[]>) => {
        setBooks(response.data);
      })
    }
  
    return(
    
         <LoadContext.Provider value={() => {
      loadData();
         }}>
      <h3>Books</h3>
      <BookList books={books} />
      </LoadContext.Provider>
    )
}