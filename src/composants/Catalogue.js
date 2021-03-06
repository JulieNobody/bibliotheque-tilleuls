import Book from './Book'
import '../style/Catalogue.css'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'



//TODO : gerer ancres (voir scrool react)
//INFO : dans condition, "!!" permet de faire une double negation (et utiliser ===)

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Catalogue() {

    const [bookList, setBookList] = useState([])
    const [page, setPage] = useState([])

    const query = useQuery()
    const currentPage = query.get('page') ? '?page=' + query.get('page') : ''

    useEffect(() => {
        fetch('https://localhost/books' + currentPage)
            .then((res) => res.json())
            .then((bookResponse) => {
                setBookList(bookResponse[`hydra:member`])
                const view = bookResponse[`hydra:view`]
                setPage({
                    first: view['hydra:first'].replace('/books?page=',''),
                    last: view['hydra:last'].replace('/books?page=',''),
                    next:view['hydra:next'] ? view['hydra:next'].replace('/books?page=','') : ''
                })
            }
        )

    }, [currentPage])

    return (
        <div>
            <h4>Catalogue</h4>
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
            <p className="pageActuelle">- page { 
                    query.get('page')
                ?
                    query.get('page')
                :
                    '1'
            } -</p>

            <ul className="pagination">

                {( query.get('page') !== 1 && !!query.get('page'))
                    ? 
                        <li><Link to={`/?page=${1}`} >
                            Premi??re page
                        </Link></li>
                    :
                        <li className="desactiv">Premi??re page</li>
                }

                {( query.get('page') !== page.first  && !!query.get('page'))
                    ? 
                        <li><Link to={`/?page=${query.get('page') - 1}`} >
                            Page pr??c??dente
                        </Link></li>
                    :
                        <li className="desactiv">Page pr??c??dente</li>
                }


                {( query.get('page') !== page.last )
                    ? 
                        <li><Link to={`/?page=${page.next}`} >
                            Page suivante
                        </Link></li>
                    :
                        <li className="desactiv">Page suivante</li>
                }

                {( query.get('page') !== page.last )
                    ? 
                        <li><Link to={`/?page=${page.last}`} >
                            Derni??re page
                        </Link></li>
                    :
                        <li className="desactiv">Derni??re page</li>
                }

            </ul>
        </div>
    )
}

export default Catalogue
