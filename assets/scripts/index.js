import createComponent from "./component.js";

const books = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#submit");

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const id = +new Date();
    const title = document.querySelector("#book-title").value;
    const author = document.querySelector("#author").value;
    const publicationYear = document.querySelector("#publication-year").value;
    const isComplete = document.querySelector("#is-read").checked;

    putData(id, title, author, publicationYear, isComplete);
    renderData();
  });

});

function putData(id, title, author, publicationYear, isComplete) {
  const data = {
    id,
    title,
    author,
    year: publicationYear,
    isComplete,
  };

  books.push(data);
  console.log(books);
}

function renderData() {
  const readContainer = document.querySelector('#read-container');
  const unreadContainer = document.querySelector('#unread-container');

  readContainer.innerHTML = '';
  unreadContainer.innerHTML = '';

  books.forEach((data) => {
    createComponent(
      data.title,
      data.author,
      data.year,
      data.isComplete
    );
  });
}