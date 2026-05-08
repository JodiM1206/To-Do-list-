let loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit', login);
function login(e){
    e.preventDefault();
    let person = document.getElementById("uname").value;
    let password = document.getElementById("passwd").value;
    console.log (`username: ${person}, password: ${password}`);
}