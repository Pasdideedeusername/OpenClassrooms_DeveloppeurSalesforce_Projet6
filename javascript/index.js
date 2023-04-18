let imgsrc = "unavailable.png"
const content = document.getElementById("content"); //récupère la balise content dans index.htlm


//##################################### Affichage du bouton ajouter ######################################### 

const buttonAddBook = document.createElement("button"); // Crée un nouvel élément bouton
buttonAddBook.textContent = "Ajouter un livre"; // Définit le texte du bouton

const h2 = document.querySelector(".h2"); //récupère la balise h2
h2.after(buttonAddBook); // Ajoute le bouton après la balise h2

buttonAddBook.addEventListener ("click", displayFormular);


//##################################### affichage du formulaire ###################################

const searchForm = document.createElement("form");
searchForm.id = "searchForm";

function displayFormular() {

   //code ci-dessous refactorisable

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

const cancelBtn = document.createElement("input");
cancelBtn.type = "button";
cancelBtn.value = "Annuler";
searchForm.appendChild(cancelBtn);

h2.after(searchForm); 
buttonAddBook.remove();

};

//##################################### Recherche de correspondance dans l'API Google books ###################################

searchForm.addEventListener("submit", (event) => {
  event.preventDefault(); //sans cette ligne, la page sera redirigé pendant l'exécution du code, empêchant son bon déroulement

  const titleValue = document.getElementById("title").value.trim();
  const authorValue = document.getElementById("author").value.trim();
  if (titleValue !== "" && authorValue !== "") {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleValue}+inauthor:${authorValue}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        content.innerHTML = "<H2> Résultats de recherche <br/> <h2>"; // remplace "Ma poch'list" 
        if (data.totalItems === 0) {

          alert("Aucun livre n'a été trouvé");
      }
        data.items.forEach(book => {
          displaySearchResults(book);
          })

        console.log("Résultats de la recherche : ", data);
        
      })
      .catch((error) => console.error("Une erreur s'est produite : ", error));
} else {
    alert("Veuillez remplir tous les champs !");
  }

});

//#####################################Affichage des resultats ###################################


function displaySearchResults(book) {
  
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const idSpan = document.createElement("span");
    idSpan.innerText = `ID: ${book.id}`;
    bookDiv.appendChild(idSpan);

    const titleSpan = document.createElement("span");
    titleSpan.innerText = `Titre: ${book.volumeInfo.title}`;
    bookDiv.appendChild(titleSpan);

    const authorSpan = document.createElement("span");
    authorSpan.innerText = `Auteur: ${book.volumeInfo.authors ? book.volumeInfo.authors[0] : "Information manquante"}`;
    bookDiv.appendChild(authorSpan);

    const bookmarkIcon = document.createElement("i");
    bookmarkIcon.classList.add("fas", "fa-bookmark");
    bookDiv.appendChild(bookmarkIcon);

    const descriptionSpan = document.createElement("span");
    const description = book.volumeInfo.description ? book.volumeInfo.description.slice(0, 200) : "Information manquante";
    descriptionSpan.innerText = `Description: ${description}`;
    bookDiv.appendChild(descriptionSpan);

    const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "unavailable.png";
    const imageElem = document.createElement("img");
    imageElem.src = image;
    bookDiv.appendChild(imageElem);

    content.after(bookDiv); 
    //bookDiv.innerHTML = ""; // Efface les résultats précédents

}



