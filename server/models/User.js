const con = require("./db_connect")
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

    await con.query(sql)
}

createUserTable()
/*
{
  email: Bob@Bobby.com,
  user_passwd: "password",
}
*/

async function login(user) {
  let cUser = await getUserByEmail(user.email)
  if(!cUser) throw Error("Email not found!")
  
  let match = await bcrypt.compare(user.password, cUser.password)
  if(!match) throw Error("Password Incorrect!")
  
  return cUser
}

async function getUserByEmail(email) {
  let sql = `
    SELECT * FROM users
    WHERE email=?
  `
  let cUser = await con.query(sql, [email])
  return cUser[0]
}

async function getAllUsers() {
    let sql = `
      SELECT * FROM users;
    `           
    return await con.query(sql)
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

  let hashedPassword = await bcrypt.hash(user.password, 10)
  
  let sql = `
    INSERT INTO User(first_name, last_name, user_passwd, email)
    VALUES(?, ?, ?, ?)
  `

  await con.query(sql, [user.firstName, user.lastName, hashedPassword, user.email])
  return await login(user)
}

//Delete User function
async function deleteUser(user_id) {
  let sql = `
    DELETE FROM users
    WHERE user_id=?
    `
    await con.query(sql, [user_id])
}
module.exports = { getAllUsers, login, register, deleteUser}