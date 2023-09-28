const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.querySelector(".new-book-form");
const newBookCloseButton = document.querySelector(".close-button");
const booksGrid = document.querySelector(".books-grid");
const bookTemplate = document.querySelector(".book-template");
const bookDeleteButton = document.querySelector(".delete-button");


const myLibrary = [];


function resetForm() {
    newBookDialog.close();
    newBookForm.reset();
}

function Book(form) {
    this.title = form.get("title");
    this.author = form.get("author");
    this.pages = form.get("pages");
    this.series = form.get("series");
    this.published = form.get("published");
    this.readStatus = form.get("readStatus");
}

// Update library UI with book cards
function updateLibraryUI(bookTemplateClone, book) {
    let deleteButton = bookTemplateClone.querySelector(".delete-button")
    let title = bookTemplateClone.querySelector(".title");
    let author = bookTemplateClone.querySelector(".author");
    let pages = bookTemplateClone.querySelector(".pages");
    let series = bookTemplateClone.querySelector(".series");
    let published = bookTemplateClone.querySelector(".published");
    let readStatus = bookTemplateClone.querySelector(".read-toggle");

    // Create a div book container for the added book
    const bookDiv = document.createElement("div");
    bookDiv.classList.add(`book_${i}`, "book");
    // Set template elements with new book data
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    series.textContent = book.series;
    published.textContent = book.published;
    readStatus.checked = (book.readStatus === "true");

    bookDiv.appendChild(bookTemplateClone);   // Append book data into book div
    booksGrid.appendChild(bookDiv);   // Append book into library

    bookCount++;   // 
}

function addBookToLibrary(newBookForm) {
    // Convert input form into FormData object and save into Book object
    const formData = new FormData(newBookForm);
    const book = new Book(formData);

    const bookTemplateClone = bookTemplate.content.cloneNode(true);   // Create a copy of the book UI template
    updateLibraryUI(bookTemplateClone, book);
    myLibrary.push(book);
}


let bookCount = 1;


addBookButton.addEventListener("click", () => newBookDialog.showModal());

newBookCloseButton.addEventListener("click", resetForm);
newBookDialog.addEventListener("click", resetForm);  // Clicking anywhere when dialog is open closes it
newBookForm.addEventListener("click", (e) => e.stopPropagation());   // Ensure clicking on the form doesnt close it

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(newBookForm);
    resetForm();
})

bookDeleteButton.addEventListener("click", (e) => {
    console.log(e.target)
})