import { setCurrentUser } from "./User.js";
import { fetchData } from "./main.js";
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener('submit', login);
async function login(e){
    e.preventDefault();
    let person = document.getElementById("uname").value;
    let password = document.getElementById("passwd").value;
    console.log (`username: ${person}, password: ${password}`);

    fetchData('/user/login', {
        username: person,
        user_passwd: password
    }, "POST")
    .then(data => {
        setCurrentUser(data)
        window.location = "List.html"
    })
    .catch(err => {
        let error = document.getElementById("error")
        error.innerText = err.message
        document.getElementById("passwd").value = ""
    })
}