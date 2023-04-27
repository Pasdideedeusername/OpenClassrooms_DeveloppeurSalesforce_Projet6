class DomManipulator {

   constructor(){}

  createBoutonAjouterUnLivre(){
    
        const buttonAddBook = document.createElement("button"); // Crée un nouvel élément bouton
        buttonAddBook.textContent = "Ajouter un livre"; // Définit le texte du bouton
        buttonAddBook.id = "buttonAddBook";
    
        const h2 = document.querySelector(".h2"); //récupère la balise h2
        h2.after(buttonAddBook); // Ajoute le bouton après la balise h2
        this.createFormular();

        buttonAddBook.addEventListener ("click", this.displayFormular);
        
   }
  createFormular(){

        const h2 = document.querySelector(".h2"); 
        const searchForm = document.createElement("form");
        searchForm.id = "searchForm";
        searchForm.addEventListener("submit", this.handleClickSearch ) 
        h2.appendChild(searchForm);
        return searchForm;
    } 
   displayFormular() {

        let searchForm = document.getElementById ("searchForm");
        const h2 = document.querySelector(".h2"); 
        h2.after(searchForm); 
        let buttonAddBook= document.getElementById ("buttonAddBook")
        buttonAddBook.remove();

        const titleLabel = document.createElement("label");
        titleLabel.for = "title";
        titleLabel.textContent = "Titre du livre* : ";
        searchForm.appendChild(titleLabel);
        
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "title";
        titleInput.required = true;
        titleInput.placeholder = "quel titre cherchez-vous ?";
        searchForm.appendChild(titleInput);
        
        const authorLabel = document.createElement("label");
        authorLabel.for = "author";
        authorLabel.textContent = "Auteur* : ";
        searchForm.appendChild(authorLabel);
        
        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.id = "author";
        authorInput.required = true;
        authorInput.placeholder = "de quel auteur ?";
        searchForm.appendChild(authorInput);
        
        const searchBookBtn = document.createElement("button");
        searchBookBtn.textContent = "Rechercher";
        searchBookBtn.id = "searchBookBtn";
        searchBookBtn.setAttribute("type","submit");
        searchForm.appendChild(searchBookBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Annuler";
        cancelBtn.id = "cancelBtn";
        cancelBtn.setAttribute("type", "button")// ligne rajoutée: permet de s'affranchir de event.preventDefault
        //cancelBtn.setAttribute("type","submit");
        cancelBtn.addEventListener("click", this.cancelBtnClick);
        cancelBtn.onclick = this.cancelBtnClick;
        searchForm.appendChild(cancelBtn);

        };

    cancelBtnClick(event){ // CA NE FONCTIONNE PLUS DEPUIS QUE LE CODE EST ISOLE EN FONCTION
        //location.reload();
        event.preventDefault();
        alert(" vous avez cliqué sur le boutton annuler");
        let searchResult = document.getElementById("displaySearchResultsDiv");
        searchResult.remove();
        let searchDivTitle = document.querySelector(".searchDivTitle");
        searchDivTitle.remove();
        let hr = document.querySelector(".hr");
        hr.remove();
        let searchForm = document.getElementById ("searchForm");
        searchForm.remove();
        this.createBoutonAjouterUnLivre;
       };

   handleClickSearch(event){
       event.preventDefault();
        const titleValue = document.getElementById("title").value.trim();
        const authorValue = document.getElementById("author").value.trim();
        if (titleValue !== "" && authorValue !== "") {
 
        let googleBookAPI  = new GoogleBooksAPI();
        googleBookAPI.searchBook(titleValue, authorValue )
        .then((data) => {
        if (data.totalItems === 0) {
        

          alert("Aucun livre n'a été trouvé");
        }
        console.log (convertGoogleBooksToBooks (data.items))
        new DomManipulator().displaySearchResults(convertGoogleBooksToBooks (data.items)); 
  
        console.log("Résultats de la recherche : ", data);
        
        })

        .catch((error) => console.error("Une erreur s'est produite : ", error));
       
       };
    }

    displaySearchResults(books) { 
     
      const content = document.getElementById("content");

      const searchDivTitle = document.createElement("h2");
      searchDivTitle.classList.add("searchDivTitle");
      searchDivTitle.innerText = "Résultats de recherche";
      content.before(searchDivTitle);

      const displaySearchResultsDiv = document.createElement("div");
      displaySearchResultsDiv.id = "displaySearchResultsDiv"
      //displaySearchResultsDiv.classList.add("book");
      content.before(displaySearchResultsDiv); 

      const hr = document.createElement("hr")
      hr.classList.add("hr");
      content.before(hr);
      
         
      books.forEach (book => {
      
        const displayBookContainer = DisplayBook.displayBook(book);
        displaySearchResultsDiv.appendChild(displayBookContainer);

        const bookmarkIcon = document.createElement("i");
        bookmarkIcon.classList.add("fas", "fa-bookmark");
        bookmarkIcon.id = ("icon");
        bookmarkIcon.title = "Ajouter à ma Poch'list";
        bookmarkIcon.addEventListener("click", BookMark.bookmarkIconOnClick.bind(this, book)) 
        displaySearchResultsDiv.appendChild(bookmarkIcon);

      })
    }
   displayPochListe(){
    //let pochListeTitle = document.getElementById("content").firstChild;
    let pochListeContent = document.createElement("div");
    pochListeContent.id = "pochListeContent";
    let bookList = BookMark.getBooksFromSessionStorage();
    let bookHtmlList = DisplayBook.displayBooks(bookList, false);
    bookHtmlList.forEach(bookHtml=>{
      pochListeContent.appendChild(bookHtml);
    })
    content.appendChild(pochListeContent);
   }
}

