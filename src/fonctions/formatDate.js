 // ----- mise en forme de la date -----
export default function formatDate(dateRecup){

    //FIXME : voir npm date-fns (local fr, ...)
        
    const date = new Date (dateRecup)
    
    // ----- passage du mois en string -----
    function DefMois(moisNb)
    {
        var moisString = " ";

        switch (moisNb) {
            case 0:
                moisString = "janvier"; break;
            case 1:
                moisString = "févier"; break;
            case 2:
                moisString = "mars"; break;
            case 3:
                moisString = "avril"; break;
            case 4:
                moisString = "mai"; break;
            case 5:
                moisString = "juin"; break;
            case 6:
                moisString = "juillet"; break;
            case 7:
                moisString = "août"; break;
            case 8:
                moisString = "septembre"; break;
            case 9:
                moisString = "octobre"; break;
            case 10:
                moisString = "novembre"; break;
            case 11:
                moisString = "décembre"; break;
            default:
                moisString = "erreur"; break;
        }
        return (moisString);
    }
    return `${date.getDate()} ${DefMois(date.getMonth())} ${date.getFullYear()}`
}

