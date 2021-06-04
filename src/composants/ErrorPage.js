import { Link } from 'react-router-dom';


function ErrorPage (){
   
    return (
        <p>
            Vous devez faire erreur, cette page n'existe pas, retourner au <Link to="/">catalogue</Link>
        </p>
    )
}

export default ErrorPage;