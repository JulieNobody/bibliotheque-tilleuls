import { useParams } from 'react-router'
import React,{ useEffect, useState } from 'react'
import formatDate from '../fonctions/formatDate'
import { Link } from 'react-router-dom'
import '../style/BookDetail.css'

//INFO : "id" dans au tableau des dépendances permet de refresh quand l'url change
//TODO : lien pour supprimer le livre

function BookDetail (){

    const { id } = useParams()
    const [book, setBook] = useState({})
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        fetch(`https://localhost/books/${id}`)
            .then((res) => res.json())
            .then((book) => setBook(book))

        fetch(`https://localhost/books/${id}/reviews`)
            .then((res) => res.json())
            .then((reviewResponse) => setReviewList(reviewResponse[`hydra:member`]))

    }, [id])

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

                <Link to={{ pathname: `/ModifLivre/?idLivre=${book.id}` }} >
                    Modifier le livre ✏️
                </Link>

            </div>

            <h4>Avis</h4>
            <div className="reviewList">
                {reviewList.map((review) => (

                    <div className="review" key={review['@id']}>
                        <p className="auteur">{review.author} - {formatDate(review.publicationDate)}</p>
                        <div className="rate">
                                {(new Array (review.rating).fill('★').join(''))}
                                {(new Array (5 - review.rating).fill('☆').join(''))}
                        </div>
                        
                        <p>{review.body}</p>
                    </div>

                ))}
            </div>

        </div>
    )
}

export default BookDetail
