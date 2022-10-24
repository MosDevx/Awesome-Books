const bookList = document.getElementById('book-list');

const booksArray = [];

function Book (title,author) {
    this.title = title;
    this.author = author;
}

function createBook (book){
    let mainDiv = document.createElement('div');
    let pTitle = document.createElement('p');
    let pAuthor = document.createElement('p');
    let button = document.createElement ('button');
    pTitle.textContent = book.title;
    pAuthor.textContent = book.author;
    button.textContent = "delete";
    mainDiv.append(pTitle, pAuthor, button);
    return mainDiv;
}

function populateBookList (books){
    booksArray.forEach(book => {
        let bItem = createBook(book);
        bookList.append(bItem);
    });
}

bookList.append(book);

