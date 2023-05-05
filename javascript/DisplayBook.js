class DisplayBook{

    constructor(){ }

    static displayBook(book, isSearched){

        const displayBookContainer = document.createElement("div");
        displayBookContainer.classList.add("book");

        const bookTitle = document.createElement("span");
        bookTitle.textContent = "Titre:  " + book.title;
        bookTitle.id = "bookTitle";
        displayBookContainer.appendChild(bookTitle);

        const bookmarkIcon = document.createElement("i");
        bookmarkIcon.id = "bookMarkIcon";

        if (isSearched){
        bookmarkIcon.classList.add("fas", "fa-bookmark");
        bookmarkIcon.title = "Ajouter à ma Poch'list";
        bookmarkIcon.addEventListener("click", BookMark.bookmarkIconOnClick.bind(this, book)) 
        
        }else{ //if not searched, then in Ma Pochliste
            bookmarkIcon.classList.add("fas", "fa-trash");
            bookmarkIcon.title = "Retirer de ma Poch'list";
            bookmarkIcon.addEventListener("click", BookMark.trashIconOnClick.bind(this, book))  
            displayBookContainer.id = book.id;

        }
        displayBookContainer.appendChild(bookmarkIcon);

      
        const idSpan = document.createElement("span");
        idSpan.innerText = "Id:  " + book.id;
        idSpan.id = "idSpan";
        displayBookContainer.appendChild(idSpan);
      
        const bookAuthor = document.createElement("p");
        bookAuthor.innerText = "Auteur:  " + book.author;
        bookAuthor.id = "bookAuthor";
        displayBookContainer.appendChild(bookAuthor);
      
        const bookDescriptionSpan = document.createElement("p");
        bookDescriptionSpan.textContent = "Description:  " + book.description;
        bookDescriptionSpan.id = "bookDescriptionSpan";
        displayBookContainer.appendChild(bookDescriptionSpan);
      
        const bookImage = document.createElement("img");
        bookImage.src = book.image;
        bookImage.id = "bookImage";
        displayBookContainer.appendChild(bookImage);

        return displayBookContainer;
        }

        static displayBooks (bookList, isSearched){
            let displayBookContainerList = [];
            bookList.forEach(book => {
                displayBookContainerList.push(DisplayBook.displayBook(book,isSearched));
        
            });

        return displayBookContainerList;
        }

}