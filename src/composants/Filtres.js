import '../style/Filtres.css';
import random from "../fonctions/random"
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";

//TODO : souligner page en cours

function Filtres(){

    const [recherche, setRecherche] = useState();
    const history = useHistory()

    const [bookRandom, setBookRandom] = useState({});

    useEffect(() => {
        random().then((livre) => {
            setBookRandom(livre)
        })
    })

    function rechercheLivre(event)
    {
        setRecherche(event.target['monImput'].value)
        event.preventDefault();
    }
    

    function redirect(){
        history.push(`/ResultRecherche/?title=${recherche}`)
        //history.replace(redirectPath)
        //history.go()
    }
    //FIXME : valider 2x pour faire une recherche

    
    return (
        <div className="filtres">
                <Link to="/">Catalogue</Link>

                <Link to={{ pathname: `/BookDetail/${bookRandom.id}` }} >
                    un livre au hasard
                </Link>

                <form onSubmit={rechercheLivre}>
                    <input type="text" name='monImput' placeholder="Recherche par titre"/>
                    <input type="submit" value="Rechercher" onClick={redirect}/>
                </form>
        </div>
    )
}

export default Filtres;