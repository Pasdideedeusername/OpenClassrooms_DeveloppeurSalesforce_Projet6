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
        titleLabel.textContent = "Titre du livre : ";
        searchForm.appendChild(titleLabel);
        
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.id = "title";
        titleInput.required = true;
        searchForm.appendChild(titleInput);
        
        const authorLabel = document.createElement("label");
        authorLabel.for = "author";
        authorLabel.textContent = "Auteur : ";
        searchForm.appendChild(authorLabel);
        
        const authorInput = document.createElement("input");
        authorInput.type = "text";
        authorInput.id = "author";
        authorInput.required = true;
        searchForm.appendChild(authorInput);
        
        const submitBtn = document.createElement("input");
        submitBtn.type = "submit";
        submitBtn.value = "Rechercher";
        searchForm.appendChild(submitBtn);
        
        cancelBtn = document.createElement("input");
        cancelBtn.type = "button";
        cancelBtn.value = "Annuler";
        searchForm.appendChild(cancelBtn);
        const h2 = document.querySelector(".h2"); //récupère la balise h2
        h2.after(searchForm); 
        let buttonAddBook= document.getElementById ("buttonAddBook")
        buttonAddBook.remove();
        
        };

    
    
    handleClickSearch(){
       
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
        data.items.forEach(book => {
        displaySearchResults(book);
        })

        console.log("Résultats de la recherche : ", data);
        
        })

        .catch((error) => console.error("Une erreur s'est produite : ", error));
        } else {
        alert("Veuillez remplir tous les champs !");
        }
       };
    }