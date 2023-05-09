class BookMark {

  constructor() { }

  static bookmarkIconOnClick(book) {
    console.log(book);
    if (!BookMark.isBookInSessionStorage(book.id)) {
      BookMark.addBookToSessionStorage(book);
      domManipulator.displayPochListe();
    } else {
      alert("Vous ne pouvez ajouter deux fois le même livre");
    }
  };

  static isBookInSessionStorage(bookId) {
    return sessionStorage.getItem(bookId) != null;
  }

  static addBookToSessionStorage(book) {

    sessionStorage.setItem(book.id, JSON.stringify(book));
  }


  static trashIconOnClick(book) {
    let bookToRemove = document.getElementById(book.id);
    bookToRemove.remove();
    sessionStorage.removeItem(book.id);
  }

  static getBooksFromSessionStorage() {
    let bookList = []
    Object.keys(sessionStorage).filter(element => element.length == 12).forEach(element => {
      bookList.push(JSON.parse(sessionStorage.getItem(element)))
    });
    return bookList;
  }
}