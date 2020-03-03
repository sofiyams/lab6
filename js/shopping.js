(() => {
const listElement = document.getElementById('shopping');
const newItem = document.getElementById('newItem');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');

function addItem(item) {
  const itemElement = document.createElement('li');
  itemElement.textContent = item;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'x';
  itemElement.appendChild(deleteButton);
  deleteButton.addEventListener('click', ev => { // <- new
   listElement.removeChild(itemElement);        // <- new
  });                                            // <- new
  listElement.appendChild(itemElement);
};

function addList(list) {
list.forEach(addItem);
}

function renderList(list) {
  list.forEach(item => {
    addItem(item);
  });
}

function clearList() {
  while(listElement.firstChild) {
    listElement.removeChild(listElement.firstChild);
  }
}

addBtn.addEventListener('click', ev => {
  newItem.value.split(',').forEach(v => {
    if(v) {
      addItem(v);
    }
  });
  newItem.value = null;
});

clearBtn.addEventListener('click', ev => {
  clearList();
});

window.addEventListener('beforeunload', ev => {
  const items = [...listElement.childNodes];
  if(items.length) {
    const list = items.map(item => {
      return item.textContent.slice(0, -1);
    });
    localStorage.setItem('shopping-list', list);
  } else {
    localStorage.removeItem('shopping-list');
  }
});

window.addEventListener('DOMContentLoaded', ev => {
  const shoppingList = localStorage.getItem('shopping-list');
  if(shoppingList) {
    renderList(shoppingList.split(','));
  }
});

newItem.addEventListener("keyup", ev => {
  if (ev.keyCode === 13) {
    addBtn.click();
  }
});
})()
