const books = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    insertBookToLibrary();
  });
});

// SUBMIT ACTION
function insertBookToLibrary() {
  createData();
  renderData(books);
}

function createData() {
  const id = `Book-${+new Date()}`;
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author").value;
  const year = document.querySelector("#publication-year").value;
  const isCompleted = document.querySelector("#is-read").checked;

  const currBook = createObject(id, title, author, year, isCompleted);
  books.push(currBook);
}

function createObject(id, title, author, year, isCompleted) {
  return { id, title, author, year, isCompleted };
}

function renderData(books) {
  const readContainer = document.querySelector("#read-container");
  const unreadContainer = document.querySelector("#unread-container");

  readContainer.innerHTML = "";
  unreadContainer.innerHTML = "";

  books.forEach((book) => {
    createComponent(book);
  });
}

// COMPONENT CREATOR
function createComponent(book) {
  const cardTitle = document.createElement("h2");
  const cardDetail = document.createElement("h4");
  const trashBtn = document.createElement("span");

  cardTitle.innerText = book.title;
  cardDetail.innerText = `${book.author} - ${book.year}`;

  trashBtn.classList.add("material-symbols-outlined");
  trashBtn.innerText = " delete ";

  trashBtn.addEventListener("click", () => {
    removeBookFromLibrary(book.id);
  });

  if (book.isCompleted) {
    const undoBtn = document.createElement("span");
    undoBtn.classList.add("material-symbols-outlined");
    undoBtn.innerText = " undo ";

    undoBtn.addEventListener("click", () => {
      moveBookToUnreadBooks(book.id);
    });

    createCard(book.id, cardTitle, cardDetail, undoBtn, trashBtn, book.isCompleted);
  } else {
    const doneBtn = document.createElement("span");
    doneBtn.classList.add("material-symbols-outlined");
    doneBtn.innerText = " done_outline ";

    doneBtn.addEventListener("click", () => {
      moveBookToReadBooks(book.id);
    });

    createCard(book.id, cardTitle, cardDetail, doneBtn, trashBtn, book.isCompleted);
  }
}

function createCard(id, cardTitle, cardDetail, optBtn, trashBtn, isCompleted) {
  const cardContent = document.createElement("div");
  cardContent.classList.add("card__content");
  const cardBtn = document.createElement("div");
  cardBtn.classList.add("card__button");

  cardContent.append(cardTitle);
  cardContent.append(cardDetail);
  cardBtn.append(optBtn);
  cardBtn.append(trashBtn);

  if (isCompleted) {
    const readCard = document.createElement("div");
    readCard.classList.add("read__card");

    readCard.append(cardContent);
    readCard.append(cardBtn);
    readCard.setAttribute("id", `${id}`);
    inputCardToDOM(readCard, isCompleted);
  } else {
    const unreadCard = document.createElement("div");
    unreadCard.classList.add("unread__card");

    unreadCard.append(cardContent);
    unreadCard.append(cardBtn);
    unreadCard.setAttribute("id", `Book-${id}`);
    inputCardToDOM(unreadCard, isCompleted);
  }
}

function inputCardToDOM(card, isCompleted) {
  console.log(books);

  if (isCompleted) {
    const readContainer = document.querySelector("#read-container");
    readContainer.append(card);
  } else {
    const unreadContainer = document.querySelector("#unread-container");
    unreadContainer.append(card);
  }
}

function moveBookToUnreadBooks(id) {
  const currBook = findBook(id);  
  if (currBook == null) return;

  currBook.isCompleted = false;
  renderData(books);
}

function moveBookToReadBooks(id) {
  const currBook = findBook(id);
  if (currBook == null) return;

  currBook.isCompleted = true;
  renderData(books);
}

function removeBookFromLibrary(id) {
  console.log(`${id}-Trash Button`);

  const currBook = findIndexBook(id);
  if (currBook === -1) return;

  books.splice(currBook, 1);
  renderData(books);
}

function findBook(id) {
  for (const book of books) {
    if (book.id === id) {
      return book;
    }
  }

  return null;
}

function findIndexBook(id) {
  for (const bookIndex in books) {
    if (books[bookIndex].id === id) {
      return bookIndex;
    }
  }

  return -1;
}