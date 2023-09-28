const addBookButton = document.querySelector(".add-book-btn");
const newBookDialog = document.getElementById("newBookDialog");
const newBookForm = document.querySelector(".new-book-form");
const newBookCloseButton = document.querySelector(".close-button");
const booksGrid = document.querySelector(".books-grid");


const myLibrary = [];

function setAttributes(element, attributes) {
    for(let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

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

function createBookCard(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    setAttributes(deleteButton, {"type": "button", "aria-hidden": true});
    const deleteButtonText = document.createTextNode("×");
    deleteButton.appendChild(deleteButtonText);

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = "Author: ";
    const authorContent = document.createElement("span");
    authorContent.classList.add("author", "book-text");
    authorContent.textContent = book.author;
    author.appendChild(authorContent);

    const pages = document.createElement("p");
    pages.textContent = "# of pages: ";
    const pagesContent = document.createElement("span");
    pagesContent.classList.add("pages", "book-text");
    pagesContent.textContent = book.pages;
    pages.appendChild(pagesContent);

    const series = document.createElement("p");
    series.textContent = "Series: ";
    const seriesContent = document.createElement("span");
    seriesContent.classList.add("series", "book-text");
    seriesContent.textContent = book.series;
    series.appendChild(seriesContent);

    const published = document.createElement("p");
    published.textcontent = "Published: ";
    const publishedContent = document.createElement("span");
    publishedContent.classList.add("published", "book-text");
    publishedContent.textContent = book.published;
    published.appendChild(publishedContent);

    const readStatus = document.createElement("div");
    readStatus.classList.add("read-book");
    const checkboxLabel = document.createElement("label");
    setAttributes(checkboxLabel, {"for": "toggle"});
    checkboxLabel.textContent = "Mark as read:";
    const readCheckbox = document.createElement("input");
    readCheckbox.classList.add("read-toggle");
    setAttributes(readCheckbox, {"type": "checkbox", "id": "toggle", "autocomplete": "off"});
    readCheckbox.checked = book.readStatus === "true";
    readStatus.appendChild(checkboxLabel);
    readStatus.appendChild(readCheckbox);

    for (let item of [deleteButton, title, author, pages, series, published, readStatus]) {
        bookCard.appendChild(item);
    }

    booksGrid.appendChild(bookCard);
    myLibrary.push(book);
}


function addBookToLibrary(newBookForm) {
    // Convert input form into FormData object and save into Book object
    const formData = new FormData(newBookForm);
    const book = new Book(formData);

    createBookCard(book)
}


let bookCount = 0;

addBookButton.addEventListener("click", () => newBookDialog.showModal());

newBookCloseButton.addEventListener("click", resetForm);
newBookDialog.addEventListener("click", resetForm);  // Clicking anywhere when dialog is open closes it
newBookForm.addEventListener("click", (e) => e.stopPropagation());   // Ensure clicking on the form doesnt close it

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(newBookForm);
    resetForm();
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        resetForm();
    }
})