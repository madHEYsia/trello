const addToList = (id, card, currentList) => {
  const list = (currentList || getList()).map((list) => {
    if (list.id == id) {
      card.id = list.cards.length + 1;
      list.cards.push(card);
    }
    return list;
  });
  return setList(list);
};

const appendToList = (list) => {
  const updatedList = getList();
  updatedList.push(list);
  return setList(updatedList);
};

const updatListOnDrag = (prevListId, prevCardId, nextListId) => {
  let prevCard = {};
  const list = getList().map((list) => {
    if (list.id == prevListId) {
      const cards = [];
      let cardIndex = 0;
      list.cards.forEach((card) => {
        if (card.id == prevCardId) {
          prevCard = card;
        } else {
          card.id = ++cardIndex;
          cards.push(card);
        }
      });
      list.cards = cards;
    }
    return list;
  });
  addToList(nextListId, prevCard, list);
};

function onAddListCTA() {
  document.getElementById("addList").remove();
  const listNode = document.getElementById("root");
  listNode.innerHTML += addListTemplate();
}

const addListFn = () => {
  const listNode = document.getElementById("root");
  const lists = getList();
  const name = document.getElementById("list-input").value;
  const list = {
    id: lists.length + 1,
    name,
    cards: [],
  };
  const addStatus = appendToList(list);
  if (!addStatus) return;
  listNode.innerHTML += getListTemplate(list);
  removeAddListFn();
};

const removeAddListFn = () => {
  const listNode = document.getElementById("root");
  document.getElementById("addListTemplate").remove();
  listNode.innerHTML += addListCTA();
};

const onListDragStart = () => {
  for (listNode of document.getElementsByClassName("listWrapper"))
    listNode.classList.add("onListHighlight");
};

const onListDragStop = () => {
  for (listNode of document.getElementsByClassName("listWrapper"))
    listNode.classList.remove("onListHighlight");
};
