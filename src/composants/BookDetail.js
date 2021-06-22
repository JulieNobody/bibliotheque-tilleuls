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


    function onSubmit() //FIXME : ne fonctionne pas + pas de redirect
    {
        if ( confirm( 'Etes-vous sûr de vouloir supprimer ce livre ?' ) ) {
            console.log('ok')

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(myBook)
        }

        fetch(`https://localhost/books/${id}`, requestOptions)
          .then(response => response.json())
            

        } else {
            console.log('pas ok')
        }

        console.log('test')

    }


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

                <div className="liens">

                    <Link to={{ pathname: `/ModifLivre/${book.id}` }} >
                        Modifier le livre ✏️
                    </Link>

                    <form onSubmit={(onSubmit)}>
                        <input className="blocForm" type="submit" value="Supprimer le livre 🗑️"></input>
                    </form>

                </div>

         

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
