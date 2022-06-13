const books = [];
const STORAGE_KEY = 'BOOKSHELF-APP';

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#submit");
  const searchBtn = document.querySelector('#search-submit');

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    insertBookToLibrary();
  });

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  };
});

// SUBMIT ACTION
function insertBookToLibrary() {
  createData();
  renderData(books);
  storeData();
}

function createData() {
  const id = `Book-${+new Date()}`;
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author").value;
  const year = document.querySelector("#publication-year").value;
  const isCompleted = document.querySelector("#is-read").checked;

  const currBook = createObject(id, title, author, year, isCompleted);

  if (title.length === 0) {
    showSnackbar("Harap mengisikan Judul Buku terlebih dahulu");
    return false;
  }

  if (author.length === 0) {
    showSnackbar("Harap mengisikan Nama Penulis terlebih dahulu");
    return false;
  }

  if (year.toString().length === 0) {
    showSnackbar("Harap mengisikan Tahun Terbit terlebih dahulu");
    return false;
  }
  
  books.push(currBook);
  showSnackbar("Berhasil Menambahkan Buku ke dalam Library ~!");
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

// SNACKBAR
function showSnackbar(description) {
  const snackbar = document.getElementById("snackbar");
  snackbar.innerText = description;
  snackbar.className = "show";

  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "");
  }, 2000);
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

    createCard(
      book.id,
      cardTitle,
      cardDetail,
      undoBtn,
      trashBtn,
      book.isCompleted
    );
  } else {
    const doneBtn = document.createElement("span");
    doneBtn.classList.add("material-symbols-outlined");
    doneBtn.innerText = " done_outline ";

    doneBtn.addEventListener("click", () => {
      moveBookToReadBooks(book.id);
    });

    createCard(
      book.id,
      cardTitle,
      cardDetail,
      doneBtn,
      trashBtn,
      book.isCompleted
    );
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

// BUTTON ACTION
function moveBookToUnreadBooks(id) {
  const currBook = findBook(id);
  if (currBook == null) return;

  currBook.isCompleted = false;
  renderData(books);
  storeData();
}

function moveBookToReadBooks(id) {
  const currBook = findBook(id);
  if (currBook == null) return;

  currBook.isCompleted = true;
  renderData(books);
  storeData();
}

function removeBookFromLibrary(id) {
  const currBook = findIndexBook(id);
  if (currBook === -1) return;

  books.splice(currBook, 1);
  renderData(books);
  storeData();
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

// WEB STORAGE
function storeData() {
  if (isStorageExist()) {
    const storageData = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, storageData);
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Maaf, Browser yang Anda gunakan tidak mendukung local storage");
    return false;
  }

  return true;
}

function loadDataFromStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(savedData);

  if (data !== null) {
    data.forEach((book) => {
      books.push(book);
    })
  }

  renderData(books);
}