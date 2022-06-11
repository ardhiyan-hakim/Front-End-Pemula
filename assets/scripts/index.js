import createComponent from "./component.js";

const books = [];

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.querySelector('#submit');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const id = +new Date();
    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#author').value;
    const publicationYear = document.querySelector('#publication-year').value;
    const isComplete = document.querySelector('#is-read').checked;  

    createComponent(title, author, publicationYear, isComplete);
  });
});

function putData(id, title, author, publicationYear, isComplete) {
  const data = {
    id,
    title,
    author,
    year: publicationYear,
    isComplete,
  }

  books.push(data);
}
