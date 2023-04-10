//##################################### Affichage du bouton ajouter ######################################### 

const buttonAddBook = document.createElement("button"); // Crée un nouvel élément bouton
buttonAddBook.textContent = "Ajouter un livre"; // Définit le texte du bouton

const h2 = document.querySelector(".h2"); //récupère la balise h2
h2.after(buttonAddBook); // Ajoute le bouton après la balise h2

buttonAddBook.addEventListener ("click", displayFormular);


//##################################### afficage du formulaire ###################################
function displayFormular() {
    const h2 = document.querySelector(".h2"); 
    const searchForm = document.createElement("form");
    searchForm.id = "searchForm";
    //ajouter son eventListener ici pour refactorer le code
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); //sans cette ligne, la page sera redirigé pendant l'exécution du code après, empêchant son bon déroulement
      const titleValue = document.getElementById("title").value.trim();
      const authorValue = document.getElementById("author").value.trim();
      if (titleValue !== "" && authorValue !== "") {
        const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${titleValue}+inauthor:${authorValue}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            displaySearchResults(); //cette fonction remplacera les lignes ci-dessous pour respecter l'affichage selon le cahier des charges
            console.log("Résultats de la recherche : ", data.items);
        alert("Formulaire soumis avec succès ! Titre du livre : " + titleValue + ", Auteur : " + authorValue);
          })
          .catch((error) => alert("Une erreur s'est produite : ", error));
    } else {
        alert("Veuillez remplir tous les champs !");
      }
    
    });
    //là le code à refactorer (fin)

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
cancelBtn.type = "submit";
cancelBtn.value = "Annuler";
searchForm.appendChild(cancelBtn);

h2.after(searchForm); 
alert("la fonction displayFormular s'est exécutée");
buttonAddBook.remove();

};
//#####################################Affichage des resultats ###################################
/*
function displaySearchResults(){


const results = document.getElementById("results");

function displayResults(books) {
  results.innerHTML = ""; // Efface les résultats précédents
  books.forEach((book) => {
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

    const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "pas-d-image-disponible.png";
    const imageElem = document.createElement("img");
    imageElem.src = image;
    bookDiv.appendChild(imageElem);

    results.appendChild(bookDiv);
  });
}
}


