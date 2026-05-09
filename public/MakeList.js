import Item from './Item.js';
import { getCurrentUser, removeCurrentUser } from './User.js';
import { fetchData } from './main.js';

// Load items when page loads
const cUser = getCurrentUser();
if(cUser) {
    fetchData(`/item/getAllItems/${cUser.user_id}`, {}, 'GET')
    .then(items => {
        items.forEach(item => addItemToList(item))
    })
    .catch(err => console.log(err))
}

let listForm = document.getElementById("listForm");
listForm.addEventListener('submit', function(e){
    e.preventDefault();
    let itemName = document.getElementById("listItem").value;
    let deadline = document.getElementById('deadline').value;
    let remindIn = document.getElementById('remindIn').value;

    const newItem = new Item(itemName, deadline, remindIn);
    console.log(newItem.toString());

    fetchData('/item/createItem', {
        item_name: itemName,
        deadline: deadline,
        remind_in: remindIn,
        user_id: cUser.user_id
    }, 'POST')
    .then(data => {
        addItemToList(newItem)
        document.getElementById('listItem').value = '';
        document.getElementById('deadline').value = '';
    })
    .catch(err => console.log(err))
});

function addItemToList(item) {
    let itemList = document.getElementById("list");
    let li = document.createElement('li');
    
    let itemSpan = document.createElement('span');
    itemSpan.innerText = item.item_name;
    
    let deadlineSpan = document.createElement('span');
    deadlineSpan.innerText = item.deadline ? new Date(item.deadline).toLocaleDateString() : '';
    
    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = item.item_status ? 'Undo' : 'Done';
    if(item.item_status) li.classList.add('completed');
    
    toggleBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
        const isDone = li.classList.contains('completed');
        toggleBtn.innerText = isDone ? 'Undo' : 'Done';
        
        // Save status to database
        fetchData(`/item/completedItem/${item.item_id}`, {
            item_status: isDone
        }, 'PATCH')
        .catch(err => console.log(err))
    });

    li.appendChild(itemSpan);
    li.appendChild(deadlineSpan);
    li.appendChild(toggleBtn);
    itemList.appendChild(li);
}

// Delete account
document.getElementById('deleteAccount').addEventListener('click', function() {
    if(confirm('Are you sure you want to delete your account? This cannot be undone!')) {
        fetchData(`/user/deleteUser/${cUser.user_id}`, {}, 'DELETE')
        .then(() => {
            removeCurrentUser()
        })
        .catch(err => console.log(err))
    }
});