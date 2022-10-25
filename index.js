const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const successSmall = document.getElementById('success-small');

let booksArray = [];

function Book(title, author) {
  this.id = Date.now();
  this.title = title;
  this.author = author;
}

function removeBookFromList(targetId) {
  const id = parseInt(targetId, 10);
  booksArray = booksArray.filter((book) => book.id !== id);
}

function createBook(book) {
  const mainDiv = document.createElement('div');
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const button = document.createElement('button');
  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'delete';
  button.dataset.id = book.id;
  button.addEventListener('click', (event) => {
    const parent = button.parentNode;
    bookList.removeChild(parent);
    removeBookFromList(event.target.dataset.id);
  });
  mainDiv.append(pTitle, pAuthor, button);
  return mainDiv;
}

function populateOriginalBookList(books) {
  books.forEach((book) => {
    const bItem = createBook(book);
    bookList.append(bItem);
  });
}

function displayOneBook(book) {
  const bItem = createBook(book);
  bookList.append(bItem);
}

window.addEventListener('DOMContentLoaded', () => {
  booksArray = JSON.parse(window.localStorage.getItem('BookData')) || [];
  if (booksArray.length) {
    populateOriginalBookList(booksArray);
  }
});

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = inputTitle.value;
  const author = inputAuthor.value;

  const newBook = new Book(title, author);
  booksArray.push(newBook);
  displayOneBook(newBook);
  successSmall.style.display = 'block';

  setTimeout(() => {
    successSmall.style.display = 'none';
  }, 2000);

  newBookForm.reset();
});

function storeBooksToStorage() {
  const booksString = JSON.stringify(booksArray);
  window.localStorage.setItem('BookData', booksString);
}

window.addEventListener('pagehide', () => {
  storeBooksToStorage();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    storeBooksToStorage();
  }
});
