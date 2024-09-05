const addBookBtn = document.querySelector("main>button");
const inputForm = document.querySelector("form");
const submitBookBtn = document.querySelector("form>button");
const booksContainer = document.querySelector(".books-container");

class Book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        let index = this.books.indexOf(book);
        if (index !== -1)
            this.books.splice(index, 1);
    }
}

function displayBook(book) {
    let bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.classList.add("card");
    let element;
    for (const key in book) {
        if (key == "read") {
            element = document.createElement("button");
            element.innerText = book.read ? "Read" : "Not read";
            element.addEventListener("click", () => {
                book.toggleRead();
                element.innerText = book.read ? "Read" : "Not read";
            });
        } else {
            element = document.createElement("p");
            element.textContent = book[key];
        }
        bookElement.appendChild(element);
    }
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        myLibrary.removeBook(book);
        booksContainer.removeChild(bookElement);
    });

    bookElement.appendChild(removeButton);
    booksContainer.appendChild(bookElement);
}

function isFormValid(form){
    let isValid = true;
    for (let element of form.querySelectorAll("input")){
        isValid = element.validity.valid;
        if (!isValid){
            return isValid;
        }
    }
    return isValid;
}

addBookBtn.addEventListener("click", () => {
    inputForm.style.display = "grid";
    addBookBtn.setAttribute("disabled", true);
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!isFormValid(inputForm)){
        return;
    }
    let title = document.querySelector("input#title");
    let author = document.querySelector("input#author");
    let pages = document.querySelector("input#pages");
    let read = document.querySelector("input#read");

    let newBook = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.addBook(newBook);
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = false;
    inputForm.style.display = "none";
    addBookBtn.removeAttribute("disabled");
    displayBook(newBook);
})

function validateTextInput(element, message) {
    if (element.validity.valueMissing) {
        element.setCustomValidity(message);
    } else {
        element.setCustomValidity("");
    }
    element.reportValidity();
}

function validateNumberOfPages() {
    if (pages.validity.rangeOverflow) {
        pages.setCustomValidity("Number of pages can't be bigger than 9999");
    } else if (pages.validity.rangeUnderflow) {
        pages.setCustomValidity("Number of pages can't be smaller than 1");
    } else {
        pages.setCustomValidity("");
    }
    pages.reportValidity();
}

title.addEventListener("input", () => {
    validateTextInput(title, "A title for the book is required");
});

author.addEventListener("input", () => {
    validateTextInput(author, "An author for the book is required");
});

pages.addEventListener("input", validateNumberOfPages);


const myLibrary = new Library();