import submitBook from "./action.js";

const books = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener("click", (e) => {
    submitBook(e, books);
  });
});


