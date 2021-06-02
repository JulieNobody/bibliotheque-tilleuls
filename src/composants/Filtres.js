import '../style/Filtres.css';
import random from "../fonctions/random"
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";

//TODO : souligner page en cours

function Filtres(){
    const location = useLocation()
    const [recherche, setRecherche] = useState();
    const history = useHistory()
    const [bookRandom, setBookRandom] = useState({});

    useEffect(() => {
        random().then((livre) => {
            setBookRandom(livre)
        })
    }, [location.key])
    
    /* eslint-disable react-hooks/exhaustive-deps */
    const redirect = useCallback((e) => {
        e.preventDefault();
        history.push(`/ResultRecherche/?title=${recherche}`)
    }, [recherche])
    /* eslint-enable react-hooks/exhaustive-deps */
    
    return (
        <div className="filtres">
                <Link to="/">Catalogue</Link>

                <Link to={{ pathname: `/BookDetail/${bookRandom.id}` }} >
                    un livre au hasard
                </Link>

                <form onSubmit={redirect}>
                    <input type="text" placeholder="Recherche par titre" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
                    <input type="submit" value="Rechercher" />
                </form>
        </div>
    )
}

export default Filtres;
