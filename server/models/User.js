const {query} = require("./db_connect")
const bcrypt = require("bcrypt")

async function createUserTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS users (
      user_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(75) NOT NULL,
      last_name VARCHAR(75) NOT NULL, 
      email VARCHAR(250) NOT NULL,
      user_passwd VARCHAR(250) NOT NULL, 
      username VARCHAR(250) NOT NULL
      );`

    await query(sql)
}

createUserTable()

// Login function
/*
{
  email: Bob@Bobby.com,
  user_passwd: "password",
}
*/

async function login(user) {
  let cUser = await getUserByEmail(user.email)
  if(!cUser) throw Error("Email not found!")
  
  let match = await bcrypt.compare(user.user_passwd, cUser.user_passwd)
  if(!match) throw Error("Password Incorrect!")
  
  return cUser
}
//Get all function
async function getUserByEmail(email) {
  let sql = `
    SELECT * FROM users
    WHERE email=?
  `
  let cUser = await query(sql, [email])
  return cUser[0]
}

async function getAllUsers() {
    let sql = `
      SELECT * FROM users;
    `           
    return await query(sql)
}

// Register function
/*
{
    first_name: "Bob",
    last_name: "Bobby",
    email: "Bob@bobby.com",
    user_passwd: "Password",
    username: "BobName",
}
*/
async function register(user) {
  let cUser = await getUserByEmail(user.email)
  if(cUser) throw Error("Email already in use!")

  let hashedPassword = await bcrypt.hash(user.user_passwd, 10)
  
  let sql = `
    INSERT INTO users(first_name, last_name, user_passwd, email, username)
    VALUES(?, ?, ?, ?, ?)
  `

  await query(sql, [user.first_name, user.last_name, hashedPassword, user.email, user.username])
  return await login(user)
}

//Delete User function
async function deleteUser(user_id) {
  let sql = `
    DELETE FROM users
    WHERE user_id=?
    `
    await query(sql, [user_id])
}

module.exports = { getAllUsers, login, register, deleteUser}