export default class User{
    constructor(firstName, lastName, username, email, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
    }
    toString(){
        return `User: ${this.firstName} ${this.lastName}, ${this.username}, ${this.email}`;
    }
}