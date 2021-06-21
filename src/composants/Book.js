import '../style/Book.css'
import { Link } from 'react-router-dom'
import formatDate from '../fonctions/formatDate'
import React from 'react'
//FIXME
function Book ({id, title, author, publicationDate}){    
    
    return (
        <div className="book">
            <h2>{title}</h2>
            <p>
                Ecrit par {author},
                paru le {formatDate(publicationDate)}
            </p>

            <Link to={{ pathname: `/BookDetail/${id}` }} >
                En savoir plus 🔍
            </Link>

        </div>
    )
}

export default Book;