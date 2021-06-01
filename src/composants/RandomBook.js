import { useEffect, useState } from "react";
import '../style/Book.css';
import formatDate from "../fonctions/formatDate";
import random from "../fonctions/random"


function RandomBook() {

    const [bookRandom, setBookRandom] = useState({});

    useEffect(() => {
        random().then((livre) => {
            setBookRandom(livre)
        })
    }, [])


    return (
        <div>
            <h4>un livre au hasard</h4>

            <div className="bookDetail">
                <h2>{bookRandom.title}</h2>
                <p>ISBN : {bookRandom.isbn}</p>
                <h3>
                    Ecrit par {bookRandom.author},
                    paru le {formatDate(bookRandom.publicationDate)}
                </h3>
                <p>Résumé :<br />{bookRandom.description}</p>

            </div>
        </div>
    )
}

export default RandomBook;