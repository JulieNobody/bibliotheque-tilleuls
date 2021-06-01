import '../style/Filtres.css';
import { Link } from 'react-router-dom';

function Filtres(){

    return (
        <div className="filtres">
                <Link to="/">Catalogue</Link>
                <Link to="/RandomBook">un livre au hasard</Link>


        </div>
    )
}

export default Filtres;