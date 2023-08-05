function randomNumber() {
    return Math.floor(Math.random() * 256); 
  }

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.r = randomNumber();
    this.g = randomNumber();
    this.b = randomNumber();
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);
const annaKarenina = new Book('Anna Karenina', 'Leo Tolstoy', 964, true);

let myLibrary = [theHobbit, annaKarenina];

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read); // way to read in title as name of variable?
  myLibrary.push(newBook);
}

const shelf = document.getElementById("shelf");

function addBooksToShelf() {
    while (shelf.firstChild) {
      shelf.removeChild(shelf.lastChild);
    }

    myLibrary.forEach(function(item) {
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        const cardTitle = document.createElement("div");
        cardTitle.innerText = item.title;
        cardTitle.classList.add("cardtitle")
        newCard.appendChild(cardTitle);
        const cardAuthor = document.createElement("div");
        cardAuthor.innerText = 'By\n' + item.author;
        newCard.appendChild(cardAuthor);
        const cardPages = document.createElement("div");
        cardPages.innerText = item.pages + ' pages';
        newCard.appendChild(cardPages);
        newCard.style.width = 30 + (.15 * item.pages) + "px";
        newCard.style.background = `radial-gradient(farthest-corner at 25% 25%, rgba(${item.r},${item.g},${item.b},0.5) 0%, rgba(${item.r},${item.g},${item.b},0.7) 20%, rgba(0,0,0,0.7) 100%)`
        const lowerCard = document.createElement("div");
        const readCheck = document.createElement("input");
        readCheck.setAttribute('type','checkbox');
        readCheck.defaultChecked = item.read;
        const readText = document.createTextNode("Read: ");
        lowerCard.appendChild(readText);
        lowerCard.appendChild(readCheck);
        newCard.appendChild(lowerCard);
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.classList.add("removebutton");
        removeButton.addEventListener('click', removeBook);
        newCard.appendChild(removeButton);
        shelf.appendChild(newCard);  // Add books to shelf
    });
}

// function addBooksToShelf() {

//     let row = document.createElement("div"); 
//     row.classList.add("shelf-row");
  
//     // Loop through books
//     books.forEach(book => {
//       // Create card
//       let card = createCard(book); 
  
//       // Add card to current row
//       row.appendChild(card);
  
//       // If row is full
//       if(row.children.length >= maxPerRow) {
        
//         // Add current row to shelf
//         shelf.appendChild(row);
        
//         // Make new row
//         row = document.createElement("div");
//         row.classList.add("shelf-row");
//       }
//     })
  
//     // Add last row
//     shelf.appendChild(row);
  
//   }

function getBookInput() {
    document.getElementById("newbookform").style.display = "flex";
    document.getElementById("newbookform").classList.add("newbookform");
};

addBooksToShelf();

const form = document.getElementById("newbookform");

function submitAction(event) {
    event.preventDefault();
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;
    addBookToLibrary(title, author, pages, read);
    addBooksToShelf();
    document.getElementById("newbookform").style.display = "none";
    form.reset();
};

form.addEventListener('submit', submitAction);

function removeBook(event) {
    let card = event.target.closest('.card'); 
    let cardTitle = card.querySelector('.cardtitle').innerText;
  
    let toremoveIndex = myLibrary.findIndex(book => book.title === cardTitle);
    myLibrary.splice(toremoveIndex, 1);
    addBooksToShelf();
}



// to work on-
// new shelf when you run out of space
// clear input fields after click/submit

