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

        const h2 = document.querySelector(".h2"); //récupère la balise h2
        const searchForm = document.createElement("form");
        searchForm.id = "searchForm";
        searchForm.addEventListener("submit", this.handleClickSearch ) 
        h2.appendChild(searchForm);
        return searchForm;
    } 
   displayFormular() {

        let searchForm = document.getElementById ("searchForm");
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
        searchForm.appendChild(searchBookBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Annuler";
        cancelBtn.id = "cancelBtn";
        searchForm.appendChild(cancelBtn);
        cancelBtn.addEventListener("click", (event) => {
         event.preventDefault();
         location.reload();
       });


        const h2 = document.querySelector(".h2"); //récupère la balise h2
        h2.after(searchForm); 
        let buttonAddBook= document.getElementById ("buttonAddBook")
        buttonAddBook.remove();
        
        };

   handleClickSearch(event){
       event.preventDefault();
        const titleValue = document.getElementById("title").value.trim();
        const authorValue = document.getElementById("author").value.trim();
        if (titleValue !== "" && authorValue !== "") {
 
        let googleBookAPI  = new GoogleBooksAPI();
        googleBookAPI.searchBook(titleValue, authorValue )
        .then((data) => {
        content.innerHTML = "<H2> Résultats de recherche <br/> <h2>"; // remplace "Ma poch'list" 
        if (data.totalItems === 0) {

        alert("Aucun livre n'a été trouvé");
        }
        console.log (convertGoogleBooksToBooks (data.items))
        convertGoogleBooksToBooks (data.items); // NEW line // returns books
        

   /*   RETIRE DEPUIS LA DERNIERE SOUTENANCE - REMPLACE PAR LA LIGNE AU-DESSUS
        data.items.forEach(book => {
        displaySearchResults(book); 
        })
   */
        console.log("Résultats de la recherche : ", data);
        
        })

        .catch((error) => console.error("Une erreur s'est produite : ", error));
       
       };
    }

   displaySearchResults(books) { // CARINE A CONTINUER ET TOUT CORRIGER
      
      books.forEach (book => {

      const bookcontainer = document.createElement("div");
      bookcontainer.classList.add("book");
  
      const idSpan = document.createElement("span");
      idSpan.innerText = book.id;
      bookcontainer.appendChild(idSpan);
  
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.title;
      bookcontainer.appendChild(bookTitle);
  
      const bookAuthor = document.createElement("span");
      bookAuthor.innerText = book.authors;
      bookcontainer.appendChild(bookAuthor);
  
      const bookmarkIcon = document.createElement("i");
      bookmarkIcon.classList.add("fas", "fa-bookmark");
      bookcontainer.appendChild(bookmarkIcon);
  
      const bookDescriptionSpan = document.createElement("p");
      bookDescriptionSpan.textContent = book.description;
      bookcontainer.appendChild(bookDescriptionSpan);
  
      const bookIimage = document.createElement("img");
      bookIimage.src = book.image;
      bookcontainer.appendChild(bookIimage);
      
      const content = document.getElementById("content");
      content.after(bookcontainer); 
      //bookcontainer.innerHTML = ""; // Efface les résultats précédents
      })
  
   }
   }
