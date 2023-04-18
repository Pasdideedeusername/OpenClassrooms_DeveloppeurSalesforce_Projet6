//new GoogleBooksAPI ().searchBook("toto", "tata").then ((result)=>console.log (result));

let imgsrc = "unavailable.png"
const content = document.getElementById("content"); //récupère la balise content dans index.htlm
let cancelBtn = null;
let domManipulator = new DomManipulator();

domManipulator.createBoutonAjouterUnLivre();


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
function convertGoogleBooksToBooks(items){
  let books= [];
  items.forEach (googleBook => { 
    books.push (new Book(googleBook));
    } )
  return books;
}

