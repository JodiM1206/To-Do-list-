import User, { setCurrentUser } from "./User.js";
import { fetchData } from "./main.js";
let form = document.getElementById("registerForm");
form.addEventListener('submit', register);
async function register(e){
    e.preventDefault();
    const createUser = new User(document.getElementById("fname").value,
        document.getElementById("lname").value,
        document.getElementById("uname").value,
        document.getElementById("email").value,
        document.getElementById("passwd").value);
    console.log(createUser.toString());

    fetchData('/user/register', {
        first_name: createUser.firstName,
        last_name: createUser.lastName,
        username: createUser.username,
        email: createUser.email,
        user_passwd: createUser.password
    }, "POST")
    .then(data => {
            setCurrentUser(data)
            window.location = "List.html"
    })
    .catch(err => {
        let error = document.getElementById("error")
        error.innerText=err.message
        document.getElementById("passwd").value=""
        })
}
