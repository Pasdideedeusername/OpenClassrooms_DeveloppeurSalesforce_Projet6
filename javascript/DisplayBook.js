class DisplayBook{

    constructor(){ }

    static displayBook(book, isSearched){

        const displayBookContainer = document.createElement("div");
        displayBookContainer.classList.add("book");

        const bookTitle = document.createElement("h3");
        bookTitle.textContent = "Titre:  " + book.title;
        displayBookContainer.appendChild(bookTitle);

        const bookmarkIcon = document.createElement("i");
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
        displayBookContainer.appendChild(idSpan);
      
        const bookAuthor = document.createElement("span");
        bookAuthor.innerText = "Auteur:  " + book.author;
        displayBookContainer.appendChild(bookAuthor);
      
        const bookDescriptionSpan = document.createElement("p");
        bookDescriptionSpan.textContent = "Description:  " + book.description;
        displayBookContainer.appendChild(bookDescriptionSpan);
      
        const bookIimage = document.createElement("img");
        bookIimage.src = book.image;
        displayBookContainer.appendChild(bookIimage);

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