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

  static storageUpdater;

  static setUpdater(value) {
    Book.storageUpdater = value;
  }

  constructor(title, author) {
    this.title = title;
    this.author = author;

    Book.booksArray.push(this);
    if (typeof Book.storageUpdater === 'function') {
      Book.storageUpdater();
    }
  }

  deleteBook() {
    const i = Book.booksArray.indexOf(this);
    Book.booksArray.splice(i, 1);
    if (typeof Book.storageUpdater === 'function') {
      Book.storageUpdater();
    }
  }

  static getAllBooksArray() {
    return Book.booksArray;
  }

  static updateBooksArray(dataSource) {
    if (dataSource?.length) {
      const newArray = dataSource.map((rawBook) => {
        const book = new Book(rawBook.title, rawBook.author);
        return book;
      });

      Book.booksArray = [];
      Book.booksArray.push(...newArray);
    }
  }
}

function storeBooksToStorage() {
  const booksString = JSON.stringify(Book.getAllBooksArray());
  window.localStorage.setItem('BookData', booksString);
}

Book.setUpdater(storeBooksToStorage);

Book.updateBooksArray(JSON.parse(window.localStorage.getItem('BookData')));

function createBook(book) {
  const mainTr = document.createElement('tr');
  const pTitle = document.createElement('td');
  const pAuthor = document.createElement('td');
  const tdButton = document.createElement('td');
  const button = document.createElement('button');
  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'delete';
  button.addEventListener('click', () => {
    const parent = tdButton.parentNode;
    bookList.removeChild(parent);
    book.deleteBook();
  });
  tdButton.appendChild(button);
  mainTr.append(pTitle, pAuthor, tdButton);
  return mainTr;
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
  const booksArray = Book.getAllBooksArray();
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

/// /////////////////////////////////////Navigation//////////////////////////

const bookPage = document.getElementById('book-page');
const formPage = document.getElementById('form-page');
const contactPage = document.getElementById('contact-page');

function showBookPage() {
  formPage.classList.add('hide');
  contactPage.classList.add('hide');
  bookPage.classList.remove('hide');
}

function showFormPage() {
  formPage.classList.remove('hide');
  contactPage.classList.add('hide');
  bookPage.classList.add('hide');
}

function showContactPage() {
  formPage.classList.add('hide');
  contactPage.classList.remove('hide');
  bookPage.classList.add('hide');
}

window.addEventListener('hashchange', () => {
  const { hash } = window.location;
  if (hash === '#book-page') {
    showBookPage();
  } else if (hash === '#form-page') {
    showFormPage();
  } else if (hash === '#contact-page') {
    showContactPage();
  }
}, false);
