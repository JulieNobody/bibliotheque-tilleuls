/* eslint-disable no-unused-vars */ //FIXME : corriger erreur
import { useForm } from 'react-hook-form'
import React, { useCallback } from 'react'
import { useState } from 'react'
import * as yup from 'yup'
import '../style/NouveauLivre.css'
//import { useHistory } from 'react-router-dom'
import formatDate2 from '../fonctions/formatDate2'
import validationLivre from '../fonctions/validationLivre'


   // -------------------- VALIDATION-------------------- (fonction réutilsée/ à sortir dans une autre fonction)//FIXME : à supprimer si ok
//    const useYupValidationResolver = validationSchema =>
//    useCallback(
//    async data => {
//        try {
//        const values = await validationSchema.validate(data, {
//            abortEarly: false
//        })

//        return {
//            values,
//            errors: {}
//        }
//        } catch (errors) {
//        return {
//            values: {},
//            errors: errors.inner.reduce(
//            (allErrors, currentError) => ({
//                ...allErrors,
//                [currentError.path]: {
//                type: currentError.type ?? 'validation',
//                message: currentError.message
//                }
//            }),
//            {}
//            )
//        }
//        }
//    },
//    [validationSchema]
// )

    // instauration des regles de validation
    //INFO : placé à l'exterieur du onSubmit pour éviter la dépense de ressource
    // let validationSchema = yup.object().shape({
    //     title :
    //         yup.string('Le titre doit être composé de lettres')
    //         .required('Vous devez saisir un titre'),
    //     isbn :
    //         yup.string('L\'ISBN doit être composé de chiffres')
    //         .required('Vous devez saisir un numéro ISBN')
    //         .length (13, 'L\'ISBN doit comporter 13 chiffres')
    //         .matches(/[0-9]/, 'L\'ISBN ne doit comporter que des chiffres'),
    //     author :
    //         yup.string('L\'auteur doit être composé de lettres').required('Vous devez saisir un auteur'),
    //     publicationDate :
    //         yup.date('La date de parution doit être une date')
    //         .required('Vous devez indiquer une date de parution')
    //         .default(function() { return new Date() }),
    //     description :
    //         yup.string('Le résumé doit être composé de lettres')
    //         .required('Vous devez saisir un résumé du livre'),
    // })

function NouveauLivre (){

    // -------------------- DECLARATION VARIABLE MYBOOK --------------------
    //INFO : objet JS != json -> faire stringify avant envoi
    var myBook = {
        title : '',
        isbn : '',
        author : '',
        publicationDate : '',
        description :''
    }

    const [postId, setPostId] = useState()
    

    

    
     // -------------------- RESOLVER--------------------
     //const resolver = useYupValidationResolver(validationSchema)//FIXME : revue de code

     const resolver = validationLivre()

    // -------------------- USEFORM--------------------
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver })

    // -------------------- ONSUBMIT--------------------
    const onSubmit = data => {
        myBook = data

        myBook.publicationDate = formatDate2(myBook.publicationDate) + 'T00:00:00.000Z'


        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(myBook)
        }

        fetch('https://localhost/books', requestOptions)
          .then(response => response.json())
          .then(data => setPostId(data.id))


        //FIXME : ajouter redirection

        //ne fonctionne pas
        // const history = useHistory()
        // history.push(`/`)

    // const redirect = useCallback((e) => {
    //     e.preventDefault()
    //     history.push(`/ResultRecherche/?title=${recherche}`)
    // }, [recherche])





    }

    return (
        <div className ="nouveaulivre">
             <h4>Nouveau livre</h4>

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* --------- TITRE --------- */}
                <div className="blocForm">
                    <label>Titre</label>
                    <input placeholder="Titre" type="text" {...register('title')}/>
                </div>

                {errors.title && <div className="blocForm messageErreur">- {errors.title.message} -</div>}

                {/* --------- ISBN --------- */}
                <div className="blocForm">
                    <label>ISBN</label>
                    <input placeholder="ISBN" type="text" {...register('isbn')}/>
                </div>

                {errors.isbn && <div className="blocForm messageErreur">- {errors.isbn.message} -</div>}

                {/* --------- AUTEUR --------- */}
                <div className="blocForm">
                    <label>Auteur</label>
                    <input placeholder="Auteur" type="text" {...register('author')}/>
                </div>

                {errors.author && <div className="blocForm messageErreur">- {errors.author.message} -</div>}

                {/* --------- DATE PARUTION --------- */}
                <div className="blocForm">
                    <label>Date de parution</label>
                    <input placeholder="Date de parution" type="date" {...register('publicationDate')}/>
                </div>

                {errors.publicationDate && <div className="blocForm messageErreur">- {errors.publicationDate.message} -</div>}

                {/* --------- RESUME --------- */}
                <div className="blocForm">
                    <label>Résumé</label>
                    <textarea rows="10" cols="100" placeholder="Résumé" type="text" {...register('description')}/>
                </div>

                {errors.description && <div className="blocForm messageErreur">- {errors.description.message} -</div>}

                {/* --------- VALIDATION --------- */}
                <input className="blocForm" type="submit" value="Valider la saisie"/>
            </form>
        </div>
    )
}

export default NouveauLivre