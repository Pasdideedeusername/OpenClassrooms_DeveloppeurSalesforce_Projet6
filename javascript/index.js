
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



