 // ----- mise en forme de la date -----
export default function formatDate(dateRecup){
    const date = new Date (dateRecup)
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
}

