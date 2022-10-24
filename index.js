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
  mainDiv.append(pTitle, pAuthor, button);
  return mainDiv;
}

function populateOriginalBookList(books) {
  booksArray.forEach((book) => {
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
  } else {

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
