export default class User{
    constructor(firstName, lastName, username, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    toString(){
        return `User: ${this.firstName}, ${this.lastName}, ${this.username}, ${this.email}, ${this.password}`;
    }
}

    export function setCurrentUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    export function getCurrentUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
    export function removeCurrentUser(){
        localStorage.removeItem('user');
        window.location.href = 'Login.html';
    }