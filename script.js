const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.querySelector(".new-book-form");
const newBookCloseButton = document.querySelector(".new-book-form > button");


const myLibrary = [];

function Book(title, author, pages, series, published, readstatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.series = series;
    this.published = published;
    this.readStatus = readstatus;
}

// function addBookToLibrary() {

// }

function resetForm() {
    newBookDialog.close();
    newBookForm.reset();
}

addBookButton.addEventListener("click", () => newBookDialog.showModal());

newBookCloseButton.addEventListener("click", resetForm);
newBookDialog.addEventListener("click", resetForm);  // Clicking anywhere when dialog is open closes it
newBookForm.addEventListener("click", (e) => e.stopPropagation());   // Ensure clicking on the form doesnt close it

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(newBookForm);
    const formDataObject = Object.fromEntries(formData);
    const book = new Book(formDataObject.title, formDataObject.author, formDataObject.pages, formDataObject.series, formDataObject.published, formDataObject.readStatus);
    
    resetForm();
})