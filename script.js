const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");



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


addBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
})
