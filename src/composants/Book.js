import '../style/Book.css';
import { Link } from 'react-router-dom';
import formatDate from "../fonctions/formatDate";

function Book ({id, isbn, title, author, publicationDate, description}){    
    
    // function prepaUrl(url)
    // {
    //     const newUrl = url.replace('books/', '');
    //     return newUrl
    // }
    
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