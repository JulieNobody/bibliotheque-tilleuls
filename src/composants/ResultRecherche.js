import Book from './Book';
import '../style/Catalogue.css';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function ResultRecherche() {

    const [bookList, setBookList] = useState([]);

    const query = useQuery();

    useEffect(() => {
        fetch("https://localhost/books?title=" + query.get("title"))
            .then((res) => res.json())
            .then((bookResponse) => {
                setBookList(bookResponse[`hydra:member`])
            }
        );

    }, [query.get("title")])

    return (
        <div>
            <h4>Résultat de la recherche</h4>
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

            {(bookList.length === 0)
                    ? 
                        <p>Pas de résultat pour cette recherche, retourner au <Link to="/">
                            catalogue
                        </Link></p>
                    :
                       ""
                }
        </div>
    )
}

export default ResultRecherche;