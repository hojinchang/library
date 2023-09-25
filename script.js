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

function addBookToLibrary() {
    
}
