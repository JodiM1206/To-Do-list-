import User from "./User.js";
let form = document.getElementById("registerForm");
form.addEventListener('submit', register);
function register(e){
    e.preventDefault();
    const createUser = new User(document.getElementById("fname").value, document.getElementById("lname").value, document.getElementById("uname").value, document.getElementById("email").value, document.getElementById("passwd").value);
    console.log(createUser.toString());
}