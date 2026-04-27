let listForm = document.getElementById("listForm");
listForm.addEventListener('submit', list);
function list(e){
    e.preventDefault();
    let item = document.getElementById("listItem").value;
    console.log(item);
}