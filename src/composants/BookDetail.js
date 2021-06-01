import { useParams } from "react-router";
import { useEffect, useState } from "react";
import formatDate from "../fonctions/formatDate";
import '../style/BookDetail.css';




function BookDetail (){

    const { id } = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
        fetch(`https://localhost/books/${id}`)
            .then((res) => res.json())
            .then((book) => setBook(book));
    }, [])

    return ( 
        <div>
            <h4>Détail du livre</h4>

            <div className="bookDetail">
            <h2>{book.title}</h2>
            <p>ISBN : {book.isbn}</p>
            <h3>
                Ecrit par {book.author},
                paru le {formatDate(book.publicationDate)}
            </h3>
            <p>Résumé :<br/>{book.description}</p>


        </div>

        </div>

    )
}

export default BookDetail;