const bookList = document.getElementById('book-list');
const newBookForm = document.getElementById('new-book-form')
const inputTitle = document.getElementById('input-title')
const inputAuthor = document.getElementById('input-author')
const successSmall = document.getElementById('success-small')

const booksArray = [{title:'asdad',author: 'asda'}, {title:'asdad',author: 'asda'}];

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

function populateOriginalBookList (books){
    booksArray.forEach(book => {
        let bItem = createBook(book);git 
        bookList.append(bItem);
    });
}

function displayOneBook(book){
	let bItem = createBook(book)
	bookList.append(bItem)
}

window.addEventListener('load',()=>{
	if (booksArray){
		populateOriginalBookList(booksArray)
	}else{
		return
	}
})


newBookForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	let title = inputTitle.value
	let author = inputAuthor.value

	let newBook = new Book(title,author);
	booksArray.push(newBook)
	displayOneBook(newBook)
	console.log(booksArray)
	successSmall.style.display='block'
	
	setTimeout(()=>{
		successSmall.style.display='none';
	},2000)
	
	newBookForm.reset();
})


