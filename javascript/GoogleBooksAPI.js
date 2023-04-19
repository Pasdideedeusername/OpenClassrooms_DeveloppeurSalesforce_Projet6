class GoogleBooksAPI{

constructor(){

}

async searchBook(titleValue, authorValue){
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleValue}+inauthor:${authorValue}`;
    console.log(url)
    return await fetch(url)
      .then((response) => {return response.json();})
      .catch((erreur)=> console.log (erreur))
}  
}
