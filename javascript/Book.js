class Book {

    constructor (googleResponse){
        this.id = googleResponse.id;
        this.title = googleResponse.volumeInfo.title;
        this.author = googleResponse.volumeInfo.authors ? googleResponse.volumeInfo.authors[0] : "Information manquante";
        this.description =  googleResponse.volumeInfo.description ? googleResponse.volumeInfo.description.slice(0, 200) : "Information manquante"
        this.image = googleResponse.volumeInfo.imageLinks ? googleResponse.volumeInfo.imageLinks.thumbnail : "unavailable.png"
    }


}