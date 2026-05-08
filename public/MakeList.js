import Item from './Item.js';
let listForm = document.getElementById("listForm");
listForm.addEventListener('submit', function(e){
    e.preventDefault();
    let item = document.getElementById("listItem").value;
    let deadline = document.getElementById('deadline').value;
    let itemList = document.getElementById("list");
    let li = document.createElement('li');
    let itemSpan = document.createElement('span');
    itemSpan.innerText = item;

    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = 'Done';
    toggleBtn.addEventListener('click', function() {
    li.classList.toggle('completed');
    toggleBtn.innerText = li.classList.contains('completed') ? 'Undo' : 'Done';
    });

    const reminderSelect = document.createElement('select');
    const options = ['never', 'daily', 'weekly', 'monthly', 'yearly'];
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.innerText = option;
        opt.value = option;
        reminderSelect.appendChild(opt);
    });
    
    const deadlineSpan = document.createElement('span');
    deadlineSpan.innerText = deadline;
    li.appendChild(itemSpan);
    li.appendChild(deadlineSpan);
    li.appendChild(toggleBtn);
    itemList.appendChild(li);

    document.getElementById('listItem').value = '';
    document.getElementById('deadline').value = '';
    const createItem = new Item(item, false, deadline, reminderSelect.value);
    console.log (createItem.toString());
});
