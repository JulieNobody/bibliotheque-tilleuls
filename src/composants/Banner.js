import '../style/Banner.css';
import logo from '../assets/logo.png';
import profilePicture from '../assets/profile-picture.png';
import { Link } from 'react-router-dom';



function Logo() {
    return (
        <Link className="logo" to="/">
            <img src={logo} alt='logo' />
            <h1>Bibliothèque<br/> des<br/> Tilleuls</h1>
        </Link>
    )
}

function Connexion() {
    return (
        <div className="connexion">
            <img src={profilePicture} alt='logo' />
            <div  className="liens">
                <p>s'inscrire</p>
                <p>se connecter</p>
            </div>
        </div>
    )
}


function Banner(){

    return (
        <div className="banner">
            <Logo />
            <Connexion />
        </div>
    )
}

export default Banner;