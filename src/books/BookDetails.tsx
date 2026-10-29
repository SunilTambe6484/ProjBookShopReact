import { useParams } from "react-router-dom";
import { bookDTO } from "./book.model";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { bookEndpoint } from "../endpoints";
import coordinateDTO from "../utilities/coordinates.model";
import ReactMarkdown from "react-markdown";
import MapField from "../forms/MapField";


export default function BookDetails() {

    const { id }: any = useParams();
    const [book, setBook] = useState<bookDTO>();

    useEffect(() => {
        axios.get(`${bookEndpoint}/${id}`)
            .then((response: AxiosResponse<bookDTO>) => {
                response.data.publishedDate = new Date(response.data.publishedDate);
                setBook(response.data);
            })
    }, [id])

    function transformCoordinates(): coordinateDTO[] {
        if (book?.shops) {
            const coordinates = book.shops.map(bookShop => {
                return {
                    lat: bookShop.latitude, lng: bookShop.longitude,
                    name: bookShop.name
                } as coordinateDTO
            });

            return coordinates;
        }

        return [];
    }

    return (
        book ? <div>
            <h2>{book.title} ({book.publishedDate.getFullYear()})</h2>
            {book.categories?.map(category =>
                <span key={category.id} style={{ marginRight: '5px' }}
                    className="btn btn-primary btn-sm rounded-pill"
                    
                >{category.name}</span>
            )} | {book.publishedDate.toDateString()}

                 <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                    <img src={book.cover}
                        style={{ width: '225px', height: '315px' }}
                        alt="poster"
                    />
                </span>
           

            {book.summary ? <div style={{ marginTop: '1rem' }}>
                <h3>Summary</h3>
                <div>
                    <ReactMarkdown>{book.summary}</ReactMarkdown>
                </div>
            </div> : null}

            {book.authors && book.authors.length > 0 ?
                <div style={{ marginTop: '1rem' }}>
                    <h3>Authors</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {book.authors?.map(author =>
                            <div key={author.id} style={{ marginBottom: '2px' }}>
                                <img alt="pic" src={author.picture}
                                    style={{ width: '50px', verticalAlign: 'middle' }}
                                />
                                <span style={{
                                    display: 'inline-block',
                                    width: '200px',
                                    marginLeft: '1rem'
                                }}>{author.name}</span>
                               
                            </div>
                        )}
                    </div>
                </div> : null
            }

            {/* {book.shops && book.shops.length > 0 ? <div>
                <h2>Showing on</h2>
                <MapField latField={''} lngField={''} coordinates={transformCoordinates()}  />
            </div> : null} */}
        </div> : <span>Loading.........</span>
    )
}