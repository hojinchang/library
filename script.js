const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.querySelector(".new-book-form");
const newBookCloseButton = document.querySelector(".new-book-form > button");


const myLibrary = [];

function Book(form) {
    this.title = form.title;
    this.author = form.author;
    this.pages = form.pages;
    this.series = form.series;
    this.published = form.published;
    this.readStatus = form.readstatus;
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
    const book = new Book(formDataObject);

    resetForm();
})