import Book from './Book';
import '../style/Catalogue.css';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Catalogue() {

    const [bookList, setBookList] = useState([]);
    const [page, setPage] = useState([]);

    const query = useQuery();
    const currentPage = query.get("page") ? "?page=" + query.get("page") : "";

    useEffect(() => {
        fetch("https://localhost/books" + currentPage)
            .then((res) => res.json())
            .then((bookResponse) => {
                setBookList(bookResponse[`hydra:member`])
                const view = bookResponse[`hydra:view`]
                setPage({
                    first: view['hydra:first'].replace('/books?page=',''),
                    last: view['hydra:last'].replace('/books?page=',''),
                    next:view['hydra:next'] ? view['hydra:next'].replace('/books?page=','') : ""
                })
            }
        );

    }, [currentPage])

    return (
        <div>
            <h4>Catalogue</h4>
            <div className="catalogue">
                {bookList.map((book) => (
                    <Book
                        key={book['@id']}
                        // id={book['@id']}
                        id={book.id}
                        isbn={book.isbn}
                        title={book.title}
                        author={book.author}
                        publicationDate={book.publicationDate}
                        description={book.description}
                    />
                ))}
            </div>
            <p className="pageActuelle">- page { query.get("page") } -</p>

            <ul className="pagination">

                {( query.get("page") !== page.first )
                    ? 
                        <li><Link to={`/?page=${page.first}`} >
                            Première page
                        </Link></li>
                    :
                        ""
                }

                {( query.get("page") !== page.first )
                    ? 
                        <li><Link to={`/?page=${query.get("page") - 1}`} >
                            Page précédente
                        </Link></li>
                    :
                        ""
                }


                {( query.get("page") !== page.last )
                    ? 
                        <li><Link to={`/?page=${page.next}`} >
                            Page suivante
                        </Link></li>
                    :
                        ""
                }

                {( query.get("page") !== page.last )
                    ? 
                        <li><Link to={`/?page=${page.last}`} >
                            Dernière page
                        </Link></li>
                    :
                        ""
                }

            </ul>
        </div>
    )
}

export default Catalogue;