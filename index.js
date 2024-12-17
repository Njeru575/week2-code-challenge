// Get DOM elements
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const itemInput = document.getElementById('itemInput');
const shoppingList = document.getElementById('shoppingList');

// Load shopping list from local storage
let shoppingItems = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render the shopping list
function renderList() {
    // Clear the current list in the UI
    shoppingList.innerHTML = '';

    // Render each item in the shopping list
    shoppingItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('shopping-item');
        if (item.purchased) {
            li.classList.add('purchased');
        }

        // List item content
        li.innerHTML = `
            <span>${item.name}</span>
            <button class="markButton">Mark Purchased</button>
            <button class="deleteButton">Delete</button>
        `;

        // Append the list item to the shopping list
        shoppingList.appendChild(li);

        // Event listener to mark as purchased
        li.querySelector('.markButton').addEventListener('click', () => togglePurchased(index));

        // Event listener to delete the item
        li.querySelector('.deleteButton').addEventListener('click', () => deleteItem(index));
    });
}

// Function to add a new item
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        shoppingItems.push({ name: itemName, purchased: false });
        itemInput.value = '';
        saveList();
        renderList();
    }
}

// Function to toggle the purchased state
function togglePurchased(index) {
    shoppingItems[index].purchased = !shoppingItems[index].purchased;
    saveList();
    renderList();
}

// Function to delete an item
function deleteItem(index) {
    shoppingItems.splice(index, 1);
    saveList();
    renderList();
}

// Function to clear the list
function clearList() {
    shoppingItems = [];
    saveList();
    renderList();
}

// Function to save the list to localStorage
function saveList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingItems));
}

// Add event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

// Initial render of the shopping list
renderList();
