import '../style/Filtres.css'
import random from '../fonctions/random'
import { Link, useHistory, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react'

//TODO : souligner page en cours
//INFO : /* eslint-disable react-hooks/exhaustive-deps */ puis  /* eslint-enable react-hooks/exhaustive-deps */
//INFO : permet de désactiver la règle sur quelques lignes
//INFO : ici, conseille d'ajouter "history" au tableau des dépendances (pas pertinant puisque ne va pas changer)
//INFO : "location.key" id du render, l'ajouter au tableau des dépendances permet de refresh quand l'url change
//INFO : 

function Filtres(){
    const location = useLocation()
    const [recherche, setRecherche] = useState()
    const history = useHistory()
    const [bookRandom, setBookRandom] = useState({})

    useEffect(() => {
        random().then((livre) => {
            setBookRandom(livre)
        })
    }, [location.key])
    
    //eslint-disable react-hooks/exhaustive-deps
    const redirect = useCallback((e) => {
        e.preventDefault()
        history.push(`/ResultRecherche/?title=${recherche}`)
    }, [recherche])
    // eslint-enable react-hooks/exhaustive-deps
    
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

                <Link to="/NouveauLivre">Ajouter un livre</Link>

        </div>
    )
}

export default Filtres
