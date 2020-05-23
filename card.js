function onAddCardCTA(listId) {
  document.getElementById(`addCard-${listId}`).remove();
  const listNode = document.getElementById(`list-${listId}`);
  listNode.innerHTML += addCardTemplate(listId);
}

const addCardFn = (id) => {
  const listNode = document.getElementById(`list-${id}`);
  const list = getList().filter((list) => list.id === id);
  const name = document.getElementById(`input-${id}`).value;
  const card = {
    id: list[0].cards.length + 1,
    name,
    description: "",
  };
  const addStatus = addToList(id, card);
  if (!addStatus) return;
  listNode.innerHTML += getCardTemplate(card, id);
  removeAddCardFn(id);
};

const removeAddCardFn = (id) => {
  const listNode = document.getElementById(`list-${id}`);
  document.getElementById(`addCardTemplate-${id}`).remove();
  listNode.innerHTML += addCardCTA(id);
};

const editCard = (listId, cardId) => {
  const docNode = document.getElementById("wrapper");
  const { cards } = getList().filter((list) => list.id === listId)[0];
  const cardInfo = cards.filter((card) => card.id === cardId)[0];
  docNode.innerHTML += getCardModal({ listId, cardId, cardInfo });
};

const updateCard = (listId, cardId) => {
  const name = document.getElementById("cardName").value,
    description = document.getElementById("cardDescription").value;
  const tagName = `${listId}-${cardId}`;
  document
    .getElementById(`card-${tagName}`)
    .getElementsByClassName("tag")[0].innerHTML = name;
  const list = getList().map((list) => {
    if (list.id === listId) {
      list.cards = list.cards.map((card) => {
        if (card.id === cardId) {
          card = { id: cardId, name, description };
        }
        return card;
      });
    }
    return list;
  });
  const updateStatus = setList(list);
  if (updateStatus) closeCardModal();
};

const deleteCard = (listId, cardId) => {
  const tagName = `${listId}-${cardId}`;
  document.getElementById(`card-${tagName}`).remove();
  const list = getList().filter((list) => {
    if (list.id === listId) {
      list.cards = list.cards.filter((card) => {
        if (card.id === cardId) return false;
        return true;
      });
    }
    return true;
  });
  const updateStatus = setList(list);
  if (updateStatus) closeCardModal();
};

const closeCardModal = () => document.getElementById("cardModal").remove();

const getLCA = (node) => {
  if (node.getAttribute("class") === "list") {
    return node.getElementsByClassName("cards")[0];
  } else if (node.getAttribute("class") === "listWrapper") {
    return getLCA(node.children[0]);
  }
  return getLCA(node.parentNode);
};

const getTargetNode = (data, pickedNode) => {
  const targetNode = document.getElementById(data);
  const migrateListId = pickedNode.getAttribute("data-id"),
    migrateCardId = pickedNode.children.length + 1;
  const tagName = `${migrateListId}-${migrateCardId}`;
  targetNode.setAttribute("id", `card-${tagName}`);
  targetNode.setAttribute(
    "onclick",
    `editCard(${migrateListId}, ${migrateCardId})`
  );
  const prevCardInfo = data.split("-");
  const prevList = prevCardInfo[1],
    prevCard = prevCardInfo[2];
  updateBottomCards(prevList, prevCard);
  updatListOnDrag(prevList, prevCard, migrateListId);
  return targetNode;
};

const updateBottomCards = (prevList, prevCard) => {
  let cardIndex = prevCard;
  let current = document.getElementById(`card-${prevList}-${++cardIndex}`);
  while (current) {
    current.setAttribute("id", `card-${prevList}-${cardIndex - 1}`);
    current.setAttribute("onclick", `editCard(${prevList}, ${cardIndex - 1})`);
    current = document.getElementById(`card-${prevList}-${++cardIndex}`);
  }
};
