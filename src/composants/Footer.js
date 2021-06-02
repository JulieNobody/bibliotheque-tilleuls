import '../style/Footer.css';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import random from "../fonctions/random";

//FIXME : quand on est sur une page de détail d'un livre, le lien random ne marche pas

function Footer() {

    const [bookRandom, setBookRandom] = useState({});

    useEffect(() => {
        random().then((livre) => {
            setBookRandom(livre)
        })

    }, [])

    return (
        <div className="footer">
            <p>© Les-tilleuls.coop {new Date().getFullYear()}</p>
            <p>découvir un livre au hasard :</p>
            <Link to={{ pathname: `/BookDetail/${bookRandom.id}` }} >
                {bookRandom.title}
            </Link>
        </div>
    )
}

export default Footer;