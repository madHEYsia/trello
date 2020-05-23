const listKey = `list`;

const getList = () => {
  let storedList = localStorage.getItem(listKey);
  try {
    if (storedList) {
      return JSON.parse(storedList);
    }
  } catch (error) {}
  storedList = window.preloadedState.lists;
  localStorage.setItem(listKey, JSON.stringify(storedList));
  return storedList;
};

const setList = (list) => {
  try {
    localStorage.setItem(listKey, JSON.stringify(list));
    return true;
  } catch (error) {
    console.log("Failed to update list ", error);
    return false;
  }
};

function setUpState() {
  let rootTemplate = "";
  const lists = getList();
  lists.forEach((list) => {
    const listTemplate = getListTemplate(list);
    rootTemplate += listTemplate;
  });
  rootTemplate += addListCTA();
  document.getElementById("root").innerHTML = rootTemplate;
}

function allowDrop(e) {
  e.preventDefault();
}

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
  onListDragStart();
}

function drop(e) {
  e.preventDefault();
  onListDragStop();
  var data = e.dataTransfer.getData("text");
  let pickedNode = getLCA(e.target);
  const targetNode = getTargetNode(data, pickedNode);
  pickedNode.appendChild(targetNode);
}
