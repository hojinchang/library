const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.querySelector(".new-book-form");


const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let readMessage = read ? "already read" : "not read yet";
        return `${title} by ${author}, ${pages} pages, ${readMessage}`;
    }
}

// function addBookToLibrary() {

// }

addBookButton.addEventListener("click", () => newBookDialog.showModal());
newBookDialog.addEventListener("click", () => {   // Clicking anywhere when dialog is open closes it
    newBookDialog.close();
    newBookForm.reset();
});
newBookForm.addEventListener("click", (e) => e.stopPropagation());   // Ensure clicking on the form doesnt close it