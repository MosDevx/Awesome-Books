const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const successSmall = document.getElementById('success-small');

let booksArray = [];

function generateID() {
  return (Date.now());
}

function Book(title, author) {
  this.id = generateID();
  this.title = title;
  this.author = author;
}

const book = new Book('hey', 'there');
console.log(book);

let removeBook;

function createBook(book) {
  const mainDiv = document.createElement('div');
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const button = document.createElement('button');
  button.dataset.id = book.id;
  button.addEventListener('click', removeBook);
  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'delete';
  mainDiv.append(pTitle, pAuthor, button);
  return mainDiv;
}
function populateBookList(books) {
  bookList.innerHTML = '';
  books.forEach((book) => {
    const bItem = createBook(book);
    bookList.append(bItem);
  });
}

removeBook = function (event) {
  const { dataset: { id } } = event.target;
  console.log(id);
  booksArray = booksArray.filter((book) => (

    parseInt(id, 10) !== book.id
  ));
  console.log('Before populate ', booksArray);
  // populateBookList(booksArray);
  const parent = event.target.parentNode;
  bookList.removeChild(parent);
};

function displayOneBook(book) {
  const bItem = createBook(book);
  bookList.append(bItem);
}

/// Add books to page on load
window.addEventListener('DOMContentLoaded', () => {
  booksArray = JSON.parse(window.localStorage.getItem('booksInStorage')) || [];
  if (booksArray.length) {
    console.log(booksArray);
    populateBookList(booksArray);
  } else {
    console.log('no books present');
  }
});

// store book in local storage
function storeBooksToStorage() {
  const booksString = JSON.stringify(booksArray);
  window.localStorage.setItem('booksInStorage', booksString);
}

window.addEventListener('pagehide', () => {
  storeBooksToStorage();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    storeBooksToStorage();
  }
});

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;

  const newBook = new Book(title, author);
  booksArray.push(newBook);
  displayOneBook(newBook);
  console.log(booksArray);
  successSmall.style.display = 'block';

  setTimeout(() => {
    successSmall.style.display = 'none';
  }, 2000);

  newBookForm.reset();
});
