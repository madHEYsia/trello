const getCardTemplate = (card, listId) => {
  const { id } = card;
  const tagName = `${listId}-${id}`;
  return `<div class="card" id="card-${tagName}" draggable="true" ondragstart="drag(event)" onclick="editCard(${listId}, ${card.id})">
            <div class="cardName">
                <div class="tag">${card.name}</div>
                <div class="edit">&#9998;</div>
                </div>
        </div>`;
};

const addCardCTA = (id) =>
  `<div class="addCard" id="addCard-${id}" onclick="onAddCardCTA(${id})">
        + Add another card
    </div>`;

const addCardTemplate = (id) =>
  `<div id="addCardTemplate-${id}">
        <textarea class="textInput cardTitle" id="input-${id}" autofocus></textarea>
        <div>
            <button class="addButton" onclick="addCardFn(${id})">Add</button>
            <button class="cancelButton" onclick="removeAddCardFn(${id})">cancel</button>
        </div>
    </div>`;

const addListCTA = () =>
  `<div class="listWrapper addList" id="addList" onclick="onAddListCTA()">
        + Add another List
    </div>`;

const addListTemplate = () =>
  `<div id="addListTemplate">
        <input class="textInput" id="list-input" autofocus></input>
        <div>
            <button class="addButton" onclick="addListFn()">Add</button>
            <button class="cancelButton" onclick="removeAddListFn()">cancel</button>
        </div>
    </div>`;

const getListTemplate = (list) => {
  const { cards = [], id } = list;
  let cardTemplate = "";
  cards.forEach((card) => {
    cardTemplate += getCardTemplate(card, id);
  });
  return `<div class="listWrapper" ondragover="allowDrop(event)" ondrop="drop(event)">
            <div class="list" id="list-${id}">
                <div class="listName">
                    ${list.name}
                </div>
                <span class="cards" data-id="${id}">${cardTemplate}</span>
                ${addCardCTA(id)}
            </div>    
        </div>`;
};

const getCardModal = ({ listId, cardId, cardInfo }) => {
  return `<div id="cardModal">
  <div class="overlay" onclick=closeCardModal()></div>
  <div class="cardEditor">
      <div class="cardEditorTitle">
        <span>Edit card &#9998;</span>
        <span class="closeModal" onclick=closeCardModal()>&#x2715;</span>
      </div>
      <div class="cardEditorWrapper">
          <input class="textInput" placeholder="title" value="${cardInfo.name}" id="cardName" />
          <textarea class="textInput" placeholder="description" id="cardDescription">${cardInfo.description}</textarea>
          <button class="addButton" onclick="updateCard(${listId}, ${cardId})">Update</button>
          <button class="deleteButton" onclick="deleteCard(${listId}, ${cardId})">Delete</button>
      </div>
  </div>
</div>`;
};
