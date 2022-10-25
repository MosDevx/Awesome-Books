const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form');
const inputTitle = document.getElementById('input-title');
const inputAuthor = document.getElementById('input-author');
const successSmall = document.getElementById('success-small');

const booksArray = [{ title: 'asdad', author: 'asda' }, { title: 'asdad', author: 'asda' }];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function createBook(book) {
  const mainDiv = document.createElement('div');
  const pTitle = document.createElement('p');
  const pAuthor = document.createElement('p');
  const button = document.createElement('button');
  pTitle.textContent = book.title;
  pAuthor.textContent = book.author;
  button.textContent = 'delete';
  button.addEventListener('click',() =>{
    var parent = button.parentNode;
    bookList.removeChild(parent);
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

window.addEventListener('load', () => {
  if (booksArray) {
    populateOriginalBookList(booksArray);
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

const storedValue = []; 

newBookForm.addEventListener('change', () => {
  const thedata = {
    Title: inputTitle.value,
    Author: inputAuthor.value,
  };
  storedValue[0] =thedata;
  localStorage.setItem('BookData',JSON.stringify(storedValue));
});

function storage() {
  const fetched_data = JSON.parse(localStorage.getItem('BookData'));
  inputTitle.value = fetched_data[0].Title;
  inputAuthor.value =fetched_data[0].Author;
}

window.addEventListener('Load', storage());