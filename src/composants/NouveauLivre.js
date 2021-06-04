//import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import React, { useCallback } from "react";
import { useState } from "react";
// import axios from "axios";
import * as yup from 'yup';
// import { setLocale } from 'yup';
import '../style/NouveauLivre.css';

//FIXME : reg ex ISBN // pattern: ^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$
//FIXME : date de parution, DateTimeInterface (2021-06-03T07:46:42.652Z)
//FIXME : message erreur isbn et date

   // -------------------- VALIDATION-------------------- (fonction réutilsée/ à sortir dans une autre fonction)
   const useYupValidationResolver = validationSchema =>
   useCallback(
   async data => {
       try {
       const values = await validationSchema.validate(data, {
           abortEarly: false
       });

       return {
           values,
           errors: {}
       };
       } catch (errors) {
       return {
           values: {},
           errors: errors.inner.reduce(
           (allErrors, currentError) => ({
               ...allErrors,
               [currentError.path]: {
               type: currentError.type ?? "validation",
               message: currentError.message
               }
           }),
           {}
           )
       };
       }
   },
   [validationSchema]
);

    // instauration des regles de validation
    //INFO : placé à l'exterieur du onSubmit pour éviter la dépense de ressource
    let validationSchema = yup.object().shape({
        title : yup.string("Le titre doit être composé de lettres").required("Vous devez saisir un titre"),
        isbn : yup.number("L'ISMB doit être composé de chiffres").required("Vous devez saisir un numéro ISBN"),
        author : yup.string("L'auteur doit être composé de lettres").required("Vous devez saisir un auteur"),
        publicationDate : yup.date("La date de parution doit être une date").required("Vous devez indiquer une date de parution").default(function() { return new Date() }),
        description : yup.string("Le résumé doit être composé de lettres").required("Vous devez saisir un résumé du livre"),
    })

function NouveauLivre (){

    // -------------------- DECLARATION VARIABLE MYBOOK --------------------
    //objet JS != json -> faire stringify avant envoi
    var myBook = {
        title : '',
        isbn : '',
        author : '',
        publicationDate : '',
        description :''
    };
    // const [responsePost, setResponsePost] = useState();
    // const messageErreur = "";
    const [postId, setPostId] = useState();
    
     // -------------------- RESOLVER--------------------
     const resolver = useYupValidationResolver(validationSchema);

    // -------------------- USEFORM--------------------
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver });

    // -------------------- ONSUBMIT--------------------
    const onSubmit = data => {
        console.log("data : ",data)
        myBook = data

        //INFO : var + "" transforme en string
        myBook.isbn = data.isbn + ""//FIXME

        console.log ("1 : ",myBook.publicationDate)
        console.log ("2 : ",myBook.publicationDate.toString())
        console.log ("3 : ",myBook.publicationDate.toString().slice(8,20))
        console.log ("4 : ",myBook.publicationDate.toString().slice(8,20) + "T00:00:00.000Z")
  
        myBook.publicationDate = myBook.publicationDate.toString().slice(0,10) + "T00:00:00.000Z" //FIXME
        //FIXME : format attendu : 2021-06-08T22:00:00.000Z

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(myBook)
        };

        fetch("https://localhost/books", requestOptions)
          .then(response => response.json())
          .then(data => setPostId(data.id));
        console.log("postId : ", postId)

        console.log("validationSchema : ",validationSchema)
       
        const myBookString = JSON.stringify(myBook)
        console.log("mybook : ",myBook)
        console.log("myBookString: ", myBookString)



        // -------------------- INITIALISATION AXIOS / YUP --------------------
        
        //insertion des données dans le schema (version doc YUP / marche pas)
        // schema
        //     .isValid({
        //         title: data.title,
        //         isbn: data.isbn,
        //         author : data.author,
        //         publicationDate : data.publicationDate,
        //         description : data.description

        //     })
        //         .then(function (valid) {
        //         //ajout de "return", prb de syntaxe
        //         return valid; // => true
        //     });

        //insertion des données dans le schema (version echzaion.com/validation-with-yup / marche)
        // validationSchema
        //     .validate(data)
        //     .then(function(value) {
        //         console.log("value : ",value)
        //     })
        //     .catch(function(err){
        //         console.log("err : ",err)
        //         const messageErreur = "erreur !"
        //         console.log("messageErr", messageErreur)

        //     })

        //     console.log("messageErr", messageErreur)
        //     console.log("validationSchema", validationSchema)


        // -------------------- TEST FORMAT DATE --------------------

        // myBook = data
        // console.log("1 - date : ",myBook.publicationDate)

        // myBook.publicationDate = new Date (myBook.publicationDate)
        // console.log("2 - date : ",myBook.publicationDate)

        // myBook.publicationDate = myBook.publicationDate.toUTCString()
        // console.log("3 - date : ",myBook.publicationDate)

        // console.log("myBook : ",myBook)


        // -------------------- POST (HORS USEEFFECT / AXIOS) --------------------

        // axios.post("https://localhost/books", {myBook})
        // .then(res => {
        //     console.log("response : ",res);
        //     console.log("response date : ", res.data);
        // })  

    };


    // -------------------- WATCH --------------------


    // myBook.title = watch("title")
    // myBook.isbn = watch("isbn")
    // myBook.author = watch("author")
    // myBook.publicationDate = new Date (watch("publicationDate"))
    // myBook.description = watch("description")
 
    // console.log("myBook : ", myBook)
    // console.log("myBook.title : ", myBook.title)
    // console.log("myBook.isbn : ", myBook.isbn)
    // console.log("myBook.author : ", myBook.author)
    // console.log("myBook.publicationDate : ", myBook.publicationDate)
    // console.log("myBook.description : ", myBook.description)

  


//    useEffect(() => {
        
        // -------------------- POST (DANS USEEFFECT / FETCH) --------------------

       

        // -------------------- POST (DANS USEEFFECT / AXIOS) --------------------

        // axios.post("https://localhost/books", {myBook})
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //     })    
//    }, [])

    return (
        <div className ="nouveaulivre">
             <h4>Nouveau livre</h4>

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* --------- TITRE --------- */}
                <div className="blocForm">
                    <label>Titre</label>
                    <input placeholder="Titre" type="text" {...register("title")}/>
                </div>

                {errors.title && <div className="blocForm messageErreur">- {errors.title.message} -</div>}

                {/* --------- ISBN --------- */}
                <div className="blocForm">
                    <label>ISBN</label>
                    <input placeholder="ISBN" type="text" {...register("isbn")}/>
                </div>

                {errors.isbn && <div className="blocForm messageErreur">- {errors.isbn.message} -</div>}

                {/* --------- AUTEUR --------- */}
                <div className="blocForm">
                    <label>Auteur</label>
                    <input placeholder="Auteur" type="text" {...register("author")}/>
                </div>

                {errors.author && <div className="blocForm messageErreur">- {errors.author.message} -</div>}

                {/* --------- DATE PARUTION --------- */}
                <div className="blocForm">
                    <label>Date de parution</label>
                    <input placeholder="Date de parution" type="date" {...register("publicationDate")}/>
                </div>

                {errors.publicationDate && <div className="blocForm messageErreur">- {errors.publicationDate.message} -</div>}

                {/* --------- RESUME --------- */}
                <div className="blocForm">
                    <label>Résumé</label>
                    <input placeholder="Résumé" type="text" {...register("description")}/>
                </div>

                {errors.description && <div className="blocForm messageErreur">- {errors.description.message} -</div>}

                {/* --------- VALIDATION --------- */}
                <input className="blocForm" type="submit" value="Valider la saisie"/>
            </form>
        </div>
    )
}

export default NouveauLivre;