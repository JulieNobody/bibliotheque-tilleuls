import Book from './Book'
import '../style/Catalogue.css'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


//INFO : le tableau de dépendance du useEffect préfére une variable qu'une équation (cfL17)

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function ResultRecherche() {

    const [bookList, setBookList] = useState([])

    const query = useQuery()
    const titreRecherche = query.get('title')

    useEffect(() => {
        fetch('https://localhost/books?title=' + titreRecherche)
            .then((res) => res.json())
            .then((bookResponse) => {
                setBookList(bookResponse[`hydra:member`])
            }
        )

    }, [titreRecherche])

    return (
        <div>
            <h4>Résultat de la recherche</h4>
            <div className="catalogue">
                {bookList.map((book) => (
                    <Book
                        key={book['@id']}
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
                       ''
                }
        </div>
    )
}

export default ResultRecherche