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
        return sessionStorage.getItem(bookId)!=null;
    }

    static  addBookToSessionStorage(book) {
        
        sessionStorage.setItem(book.id, JSON.stringify(book));
      }
      
    static  addBookToReadingList(book) {
        const bookListItem = document.createElement("div");
        const displayBookContainer = DisplayBook.displayBook(book, false);
        bookListItem.appendChild(displayBookContainer);

              
        const content = document.getElementById("content");
        content.appendChild(bookListItem);
       
      } 
      static trashIconOnClick(book) { // elle est pas finie celle là ?
       let bookToRemove = document.getElementById(book.id);
       bookToRemove.remove();
       sessionStorage.removeItem(book.id);
      }

      static getBooksFromSessionStorage(){
        let bookList = []
        Object.keys(sessionStorage).filter(element=>element.length==12).forEach(element => {
        bookList.push(JSON.parse(sessionStorage.getItem(element)))
        });
        return bookList;
      }
}