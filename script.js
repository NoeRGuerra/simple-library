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

addBookBtn.addEventListener("click", () => {
    inputForm.style.display = "grid";
    addBookBtn.setAttribute("disabled", true);
});

submitBookBtn.addEventListener("click", (event) => {
    event.preventDefault();
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

const myLibrary = new Library();