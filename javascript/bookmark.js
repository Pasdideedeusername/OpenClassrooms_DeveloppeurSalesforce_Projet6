class BookMark {

    constructor(){ }

    static bookmarkIconOnClick(book) {
       console.log(book);
        if (!BookMark.isBookInSessionStorage(book.id)) {
          BookMark.addBookToSessionStorage(book);
          BookMark.addBookToReadingList(book);
        } else {
          alert("Vous ne pouvez ajouter deux fois le même livre");
        }
      };

    static  isBookInSessionStorage(bookId) {
        const readingList = JSON.parse(sessionStorage.getItem("readingList")) || [];
        return readingList.some(book => book.id === bookId);
      }
      
    static  addBookToSessionStorage(book) {
        const readingList = JSON.parse(sessionStorage.getItem("readingList")) || [];
        readingList.push(book);
        sessionStorage.setItem("readingList", JSON.stringify(readingList));
      }
      
    static  addBookToReadingList(book) {
        const content = document.getElementById("content");
        const bookListItem = document.createElement("li");
        bookListItem.textContent = book.title + " - " + book.author; // ATTENTION LA IL FAUT REMETTRE LES INFO COMPLETES DES LIVRES
        // et remplacer l'icon bookmark par delete
        content.after(bookListItem);
        console.log(book);
       
      } 

}