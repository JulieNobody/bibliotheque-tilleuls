
export default function random(){


    return fetch('https://localhost/books')
        .then((res) => res.json())
        .then((bookResponse) => {
            const bookList = bookResponse[`hydra:member`]
            
            return bookList[
                Math.floor (
                    Math.random()*(bookList.length)
                )
            ]

        })
        
}

