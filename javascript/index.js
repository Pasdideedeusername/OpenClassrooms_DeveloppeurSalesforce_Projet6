
let imgsrc = "unavailable.png"
const content = document.getElementById("content"); 
let domManipulator = new DomManipulator();

domManipulator.createBoutonAjouterUnLivre();


function convertGoogleBooksToBooks(items){
  let books= [];
  items.forEach (googleBook => { 
    books.push (new Book(googleBook));
    } )
  return books;
}

function displaySearchResults(books) { 
    
  books.forEach (book => {

  const bookcontainer = document.createElement("div");
  bookcontainer.classList.add("book");

  const bookTitle = document.createElement("h3");
  bookTitle.textContent = "Titre: " + book.title;
  bookcontainer.appendChild(bookTitle);

  const idSpan = document.createElement("span");
  idSpan.innerText = "Id: " + book.id;
  bookcontainer.appendChild(idSpan);

  const bookAuthor = document.createElement("span");
  bookAuthor.innerText = "Auteur: " + book.author;
  bookcontainer.appendChild(bookAuthor);

  const bookDescriptionSpan = document.createElement("p");
  bookDescriptionSpan.textContent = "Description:" + book.description;
  bookcontainer.appendChild(bookDescriptionSpan);

  const bookIimage = document.createElement("img");
  bookIimage.src = book.image;
  bookcontainer.appendChild(bookIimage);
  
  const bookmarkIcon = document.createElement("i");
  bookmarkIcon.classList.add("fas", "fa-bookmark");
  bookcontainer.appendChild(bookmarkIcon);

  const content = document.getElementById("content");
  content.after(bookcontainer); 

  })


}
