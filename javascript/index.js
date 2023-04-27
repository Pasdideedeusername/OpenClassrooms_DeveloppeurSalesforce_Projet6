
let imgsrc = "unavailable.png"
const content = document.getElementById("content"); 
let domManipulator = new DomManipulator();

domManipulator.createBoutonAjouterUnLivre();
domManipulator.displayPochListe(); // ICI CETTE FONCTION DOIT AFFICHER LES LIVRES DANS SESSION STORAGE MAIS CA NE MARCHE PAS


function convertGoogleBooksToBooks(items){
  let books= [];
  items.forEach (googleBook => { 
    books.push (new Book(googleBook));
    } )
  return books;
}



