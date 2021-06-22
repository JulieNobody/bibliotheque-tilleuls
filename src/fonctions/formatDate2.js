 // ----- mise en forme de la date -----
 export default function formatDate2(dateRecup){
    var date = new Date (dateRecup)
  
    return date.getFullYear()
        +'-'
        +(date.getMonth()+ 1).toString().padStart(2, '0')
        +'-'
        +date.getDate().toString().padStart(2,'0')


}

