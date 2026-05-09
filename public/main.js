import { getCurrentUser, removeCurrentUser } from "./User.js";

// Dynamic nav based on login state
let cUser = getCurrentUser()
let nav = document.querySelector('nav')

if(cUser) {
    nav.innerHTML = `
        <ul>
            <li><a id="logout">Logout</a></li>
        </ul>
    `
} else {
    nav.innerHTML = `
        <ul>
            <li><a href="Login.html">Login</a></li>
            <li><a href="Register.html">Register</a></li>
        </ul>
    `
}

// Logout event listener
let logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentUser)

// fetchData function
export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:5500${route}`, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
    body: methodType === 'GET' ? null : JSON.stringify(data)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}