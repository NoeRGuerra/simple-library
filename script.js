const addBookBtn = document.querySelector("main>button");
const inputForm = document.querySelector("form");
const submitBookBtn = document.querySelector("form>button");

const myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    console.log(myLibrary);
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
})