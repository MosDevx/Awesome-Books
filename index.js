const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const successSmall = document.getElementById('success-small');

// we have  a class Book
// an static array to contain all the instances
// method add elements to the array,
// delete element  from the array
// method to return array

class Book {
  static booksArray = []

  static count = 0

  constructor(title, author) {
    Book.count += 1;
    this.id = Book.count;
    this.title = title;
    this.author = author;

    Book.booksArray.push(this);
  }

  deleteBook() {
    const i = Book.booksArray.indexOf(this);
    Book.booksArray.splice(i, 1);
  }

  static printBooks() {
    console.log(Book.booksArray);
  }

  static getAllBooksArray() {
    return Book.booksArray;
  }
}

let booksArray = [];

// function Book(title, author) {
//   this.id = Date.now();
//   this.title = title;
//   this.author = author;
// }

function createBook(book) {
  const mainDiv = document.createElement('div');
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const button = document.createElement('button');
  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'delete';
  button.addEventListener('click', () => {
    const parent = button.parentNode;
    bookList.removeChild(parent);
    book.deleteBook();
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
  displayOneBook(newBook);
  successSmall.style.display = 'block';

  setTimeout(() => {
    successSmall.style.display = 'none';
  }, 2000);

  newBookForm.reset();
});

function storeBooksToStorage() {
  if (Book.getAllBooksArray().length) {
    const booksString = JSON.stringify(Book.getAllBooksArray());
    window.localStorage.setItem('BookData', booksString);
  }

}

window.addEventListener('pagehide', () => {
  storeBooksToStorage();
});
Book.getAllBooksArray()
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    storeBooksToStorage();
  }
});
