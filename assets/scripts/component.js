function createComponent(title, author, publicationYear, isComplete) {
  const cardTitle = document.createElement('h2');
  const cardDetail = document.createElement('h4');
  const trashBtn = document.createElement('span');

  cardTitle.innerText = title;
  cardDetail.innerText = `${author} - ${publicationYear}`;
  
  trashBtn.classList.add('material-symbols-outlined');
  trashBtn.innerText = ' delete ';
  
  if (isComplete) {
    const doneBtn = document.createElement('span');
    doneBtn.classList.add('material-symbols-outlined');
    doneBtn.innerText = ' done_outline ';

    createCard(cardTitle, cardDetail, doneBtn, trashBtn, isComplete);
  } else {
    const undoBtn = document.createElement('span');
    undoBtn.classList.add('material-symbols-outlined');
    undoBtn.innerText = ' undo ';

    createCard(cardTitle, cardDetail, undoBtn, trashBtn, isComplete);
  }
}

function createCard(cardTitle, cardDetail, optBtn, trashBtn, isComplete) {
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
    inputCardToDOM(readCard, isComplete)
  } else {
    const unreadCard = document.createElement('div');
    unreadCard.classList.add('unread__card');

    unreadCard.append(cardContent);
    unreadCard.append(cardBtn);
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

export default createComponent;