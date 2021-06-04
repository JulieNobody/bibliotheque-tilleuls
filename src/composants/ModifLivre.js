import { useForm } from "react-hook-form";
//import { useEffect, useState } from "react";
//import axios from "axios";
import * as yup from 'yup';
import { setLocale } from 'yup';
import '../style/NouveauLivre.css';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';


//FIXME : reg ex ISBN
//FIXME : date de parution, DateTimeInterface (2021-06-03T07:46:42.652Z)
//TODO : A FINIR

function ModifLivre (){

    // -------------------- RECUPERATION DU PARAM DANS URL --------------------
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const [book, setBook] = useState({});
    const query = useQuery();
    const idLivre = query.get("idLivre")

    useEffect(() => {
        fetch(`https://localhost/books/${idLivre}`)
            .then((res) => res.json())
            .then((book) => setBook(book));

    }, [idLivre])

    console.log("query : ",query)
    console.log("idLivre : ",idLivre)
    console.log("book : ",book)

    
    const messageErreur = "";
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log("data : ",data)

        // -------------------- INITIALISATION AXIOS / YUP --------------------

        //configuration des messages d'erreur personnalisés
        setLocale({
            mixed: {
              default: 'Champs non valide',
            },
          });

        // instauration des regles de validation
        let schema = yup.object().shape({
            title : yup.string().required(),
            isbn : yup.number().required(),
            author : yup.string().required(),
            publicationDate : yup.date().required().default(function() { return new Date().toISOString() }),
            description : yup.string().required(),
        })
        
        schema
            .validate(data)
            .then(function(value) {
                console.log("value : ",value)
            })
            .catch(function(err){
                console.log("err : ",err)
                const messageErreur = "erreur !"
                console.log("messageErr", messageErreur)

            })

            console.log("messageErr", messageErreur)
            console.log("schema", schema)
     
    };


    return (
        <div className ="nouveaulivre">
             <h4>Modifier un livre</h4>

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* --------- TITRE --------- */}
                <div className="blocForm">
                    <label>Titre</label>
                    <input value={book.title} type="text" {...register("title", { 
                        required: true,
                        minLength : 3 })} />
                </div>

                <div className="blocForm">
                    {errors.title && <span>Vous devez saisir un titre</span>}
                </div>

                {/* --------- ISBN --------- */}
                <div className="blocForm">
                    <label>ISBN</label>
                    <input value={book.isbn} type="text" {...register("isbn", { 
                        required: true,
                        //pattern: ^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$
                    })}/>
                </div>

                <div className="blocForm">
                    {errors.isbn && <span>Vous devez saisir un numéro ISBN</span>}
                </div>
                <p>message erreur : {messageErreur}</p>

                {/* --------- AUTEUR --------- */}
                <div className="blocForm">
                    <label>Auteur</label>
                    <input value={book.author} type="text" {...register("author", { required: true })} />
                </div>

                <div className="blocForm">
                    {errors.author && <span>Vous devez saisir un auteur</span>}
                </div>

                {/* --------- DATE PARUTION --------- */}
                <div className="blocForm">
                    <label>Date de parution</label>
                    <input value={book.publicationDate} type="date" {...register("publicationDate", { required: true })} />
                </div>

                <div className="blocForm">
                    {errors.publicationDate && <span>Vous devez saisir une date de parution</span>}
                </div>

                {/* --------- RESUME --------- */}
                <div className="blocForm">
                    <label>Résumé</label>
                    <textarea value={book.description} rows="10" cols="100" {...register("description", { required: true })} />
                </div>

                <div className="blocForm">
                    {errors.description && <span>Vous devez saisir un résumé</span>}
                </div>


                {/* --------- VALIDATION --------- */}
                <input className="blocForm" type="submit" value="Valider la saisie"/>
            </form>
        </div>
    )
}

export default ModifLivre;