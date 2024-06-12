const addBookBtn = document.querySelector("main>button");
const inputForm = document.querySelector("form");
const submitBookBtn = document.querySelector("form>button");
const booksContainer = document.querySelector(".books-container");

const myLibrary = [];
let lastIndex = 0;

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

function addBookToLibrary(book) {
    myLibrary.push(book);
    lastIndex = myLibrary.length - 1;
}

function displayBook(book) {
    let bookElement = document.createElement("div");
    let element;
    for (const key in book) {
        if (typeof book[key] == 'function')
            continue;
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
    bookElement.setAttribute("data-index-number", myLibrary.length - 1);
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        let index = parseInt(bookElement.getAttribute("data-index-number"));
        myLibrary.splice(index, 1);
        booksContainer.removeChild(bookElement);
    });

    bookElement.appendChild(removeButton);
    bookElement.classList.add("book");
    bookElement.classList.add("card");
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
    addBookToLibrary(newBook);
    title.value = "";
    author.value = "";
    pages.value = "";
    read.value = false;
    inputForm.style.display = "none";
    addBookBtn.removeAttribute("disabled");
    displayBook(newBook);
})