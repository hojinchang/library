const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.querySelector(".new-book-form");
const newBookCloseButton = document.querySelector(".new-book-form > button");
const booksGrid = document.querySelector(".books-grid");
const bookTemplate = document.querySelector(".book-template");


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

function updateLibraryUI(bookTemplateClone, book) {
    let title = bookTemplateClone.querySelector(".title");
    let author = bookTemplateClone.querySelector(".author");
    let pages = bookTemplateClone.querySelector(".pages");
    let series = bookTemplateClone.querySelector(".series");
    let published = bookTemplateClone.querySelector(".published");
    let readStatus = bookTemplateClone.querySelector(".read-toggle");

    const bookDiv = document.createElement("div");
    bookDiv.classList.add(`book_${i}`, "book");
    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    series.textContent = book.series;
    published.textContent = book.published;
    readStatus.checked = (book.readStatus === "true");

    console.log(book.readStatus, readStatus.checked)

    bookDiv.appendChild(bookTemplateClone);
    booksGrid.appendChild(bookDiv);

    i++;
}

function addBookToLibrary(newBookForm) {
    const formData = new FormData(newBookForm);
    const book = new Book(formData);

    myLibrary.push(book);

    const bookTemplateClone = bookTemplate.content.cloneNode(true);
    updateLibraryUI(bookTemplateClone, book);
}


let i = 1;

addBookButton.addEventListener("click", () => newBookDialog.showModal());

newBookCloseButton.addEventListener("click", resetForm);
newBookDialog.addEventListener("click", resetForm);  // Clicking anywhere when dialog is open closes it
newBookForm.addEventListener("click", (e) => e.stopPropagation());   // Ensure clicking on the form doesnt close it

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(newBookForm);
    resetForm();
})