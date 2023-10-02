const createBook = (() => {

    const _setAttributes = (element, attributes) => {
        for(let key in attributes) {
            element.setAttribute(key, attributes[key]);
          }
    }

    const createDeleteButton = (booksGrid) => {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        _setAttributes(deleteButton, {"type": "button", "aria-hidden": true});
        const deleteButtonText = document.createTextNode("×");
        deleteButton.appendChild(deleteButtonText);

        // Remove book from both library UI and libary array
        deleteButton.addEventListener("click", (e) => {
            let bookIdx = e.currentTarget.parentNode.dataset.bookIdx;

            booksGrid.removeChild(e.currentTarget.parentNode)
            library.removeBook(bookIdx)
        })

        return deleteButton;
    }

    const createTitleField = (book) => {
        const title = document.createElement("h3");
        title.textContent = book.title;

        return title;
    }

    const createAuthorField = (book) => {
        const author = document.createElement("p");
        author.textContent = "Author: ";
        const authorContent = document.createElement("span");
        authorContent.classList.add("author", "book-text");
        authorContent.textContent = book.author;
        author.appendChild(authorContent);

        return author;
    }

    const createPagesField = (book) => {
        const pages = document.createElement("p");
        pages.textContent = "# of pages: ";
        const pagesContent = document.createElement("span");
        pagesContent.classList.add("pages", "book-text");
        pagesContent.textContent = book.pages;
        pages.appendChild(pagesContent);

        return pages;
    }

    const createSeriesField = (book) => {
        const series = document.createElement("p");
        series.textContent = "Series: ";
        const seriesContent = document.createElement("span");
        seriesContent.classList.add("series", "book-text");
        seriesContent.textContent = book.series;
        series.appendChild(seriesContent);

        return series;
    }

    const createPublishedField = (book) => {
        const published = document.createElement("p");
        published.textContent = "Published: ";
        const publishedContent = document.createElement("span");
        publishedContent.classList.add("published", "book-text");
        publishedContent.textContent = book.published;
        published.appendChild(publishedContent);

        return published;
    }

    const createReadStatusField = (book) => {
        const readStatus = document.createElement("div");
        readStatus.classList.add("read-book");
        const checkboxLabel = document.createElement("label");
        _setAttributes(checkboxLabel, {"for": "toggle"});
        checkboxLabel.textContent = "Mark as read:";
        const readCheckbox = document.createElement("input");
        readCheckbox.classList.add("read-toggle");
        _setAttributes(readCheckbox, {"type": "checkbox", "id": "toggle", "autocomplete": "off"});
        readCheckbox.checked = book.readStatus === "true";
        readStatus.appendChild(checkboxLabel);
        readStatus.appendChild(readCheckbox);

        return readStatus;
    }

    return {createDeleteButton, createTitleField, createAuthorField, createPagesField, createSeriesField, createPublishedField, createReadStatusField}
})();



function convertFormToBook(newBookForm) {
    const formData = new FormData(newBookForm);
    const newBook = new Book(formData);

    return newBook;
}


class Book {
    bookIdx;
    constructor(form) {
        this.title = form.get("title");
        this.author = form.get("author");
        this.pages = form.get("pages");
        this.series = form.get("series");
        this.published = form.get("published");
        this.readStatus = form.get("readStatus");
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            newBook.bookIdx = bookCount;
            this.books.push(newBook);
            return
        } else {
            alert("Book already exists in your library!")
            return true;
        }
    }

    removeBook(bookIdx) {
        this.books = this.books.filter(book => book["bookIdx"] != bookIdx);
    }

    isInLibrary(newBook) {
        return this.books.some(book => book["title"] === newBook["title"]);
    }
}

const library = new Library();
let bookCount = 0;

const displayController = (() => {
    const addBookButton = document.querySelector(".add-book-btn");
    const newBookDialog = document.getElementById("newBookDialog");
    const newBookForm = document.querySelector(".new-book-form");
    const newBookCloseButton = document.querySelector(".close-button");
    const booksGrid = document.querySelector(".books-grid");

    const _resetForm = () => {
        newBookDialog.close();
        newBookForm.reset();
    }

    const _createBookCard = (book, bookCount) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book");

        const deleteButton = createBook.createDeleteButton(booksGrid);
        const title = createBook.createTitleField(book);
        const author = createBook.createAuthorField(book);
        const pages = createBook.createPagesField(book);
        const series = createBook.createSeriesField(book);
        const published = createBook.createPublishedField(book);
        const readStatus = createBook.createReadStatusField(book)

        for (let item of [deleteButton, title, author, pages, series, published, readStatus]) {
            bookCard.appendChild(item);
        }

        bookCard.dataset.bookIdx = bookCount;

        booksGrid.appendChild(bookCard);
    }

    addBookButton.addEventListener("click", () => newBookDialog.showModal());

    newBookCloseButton.addEventListener("click", _resetForm);
    newBookDialog.addEventListener("click", _resetForm);  // Clicking anywhere when dialog is open closes it
    newBookForm.addEventListener("click", (e) => e.stopPropagation());   // Ensure clicking on the form doesnt close it

    newBookForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let bookExists = library.addBook(convertFormToBook(newBookForm));
        if (!bookExists) _createBookCard(convertFormToBook(newBookForm), bookCount);

        _resetForm();
        bookCount++;
    })
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            _resetForm();
        }
    })
})();