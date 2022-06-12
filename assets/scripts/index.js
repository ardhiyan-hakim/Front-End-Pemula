const books = [];

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("#submit");
  submitBtn.addEventListener("click", (e) => {
    submitBook(e, books);
  });
});

// SUBMIT ACTION
function submitBook(e, books) {
  e.preventDefault();

  const id = +new Date();
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#author").value;
  const publicationYear = document.querySelector("#publication-year").value;
  const isComplete = document.querySelector("#is-read").checked;

  putData(id, title, author, publicationYear, isComplete, books);
  renderData(books);
}

function putData(id, title, author, publicationYear, isComplete, books) {
  const data = {
    id,
    title,
    author,
    year: publicationYear,
    isComplete,
  };

  books.push(data);
}

function renderData(books) {
  const readContainer = document.querySelector('#read-container');
  const unreadContainer = document.querySelector('#unread-container');

  readContainer.innerHTML = '';
  unreadContainer.innerHTML = '';

  books.forEach((data) => {
    createComponent(
      data.id,
      data.title,
      data.author,
      data.year,
      data.isComplete,
    );
  });
}

// COMPONENT CREATOR 
function createComponent(id, title, author, publicationYear, isComplete, books) {
  const cardTitle = document.createElement('h2');
  const cardDetail = document.createElement('h4');
  const trashBtn = document.createElement('span');

  cardTitle.innerText = title;
  cardDetail.innerText = `${author} - ${publicationYear}`;
  
  trashBtn.classList.add('material-symbols-outlined');
  trashBtn.innerText = ' delete ';

  trashBtn.addEventListener('click', () => {
    removeBookFromLibrary(id, books);
  })
  
  if (isComplete) {
    const undoBtn = document.createElement('span');
    undoBtn.classList.add('material-symbols-outlined');
    undoBtn.innerText = ' undo ';

    undoBtn.addEventListener('click', () => {
      moveBookToReadBooks(id, books);
    })

    createCard(id, cardTitle, cardDetail, undoBtn, trashBtn, isComplete);
  } else {
    const doneBtn = document.createElement('span');
    doneBtn.classList.add('material-symbols-outlined');
    doneBtn.innerText = ' done_outline ';

    doneBtn.addEventListener('click', () => {
      moveBookToUnreadBooks(id, books);
    })

    createCard(id, cardTitle, cardDetail, doneBtn, trashBtn, isComplete);
  }
}

function createCard(id, cardTitle, cardDetail, optBtn, trashBtn, isComplete) {
  const cardContent = document.createElement('div');
  cardContent.classList.add('card__content');
  const cardBtn = document.createElement('div');
  cardBtn.classList.add('card__button');

  cardContent.append(cardTitle);
  cardContent.append(cardDetail);
  cardBtn.append(optBtn);
  cardBtn.append(trashBtn);

  if (isComplete) {
    const readCard = document.createElement('div');
    readCard.classList.add('read__card');

    readCard.append(cardContent);
    readCard.append(cardBtn);
    readCard.setAttribute('id', `Book-${id}`);
    inputCardToDOM(readCard, isComplete)
  } else {
    const unreadCard = document.createElement('div');
    unreadCard.classList.add('unread__card');

    unreadCard.append(cardContent);
    unreadCard.append(cardBtn);
    unreadCard.setAttribute('id', `Book-${id}`);
    inputCardToDOM(unreadCard, isComplete)
  }
}

function inputCardToDOM(card, isComplete) {
  if (isComplete) {
    const readContainer = document.querySelector('#read-container');
    readContainer.prepend(card);
  } else {
    const unreadContainer = document.querySelector('#unread-container');
    unreadContainer.prepend(card);
  }
}