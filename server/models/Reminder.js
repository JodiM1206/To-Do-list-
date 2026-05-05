const con = require("./db_connect")
const bcrypt = require("bcrypt")

async function createReminderTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS reminder (
      remind_id INT AUTO_INCREMENT PRIMARY KEY,
      remind_in ENUM ( 'never', 'daily', 'weekly', 'monthly', 'yearly') DEFAULT 'never',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      list_id INT NOT NULL,
      CONSTRAINT reminder_list_id FOREIGN KEY (list_id) REFERENCES to_do_list(list_id)
      ); `

    await con.query(sql)
}

createReminderTable()

async function getAllReminders() {
  let sql = `
    SELECT * FROM reminder;
  `
  return await con.query(sql)
}

// Register function
/*
{
  email: "cathy123",
  password: "icecream",
  firstName: "Cathy",
  lastName: "Bates"
}
*/
async function register(user) {
  let cUser = await getUserByEmail(user.email)
  if(cUser) throw Error("Email already in use!")

  let hashedPassword = await bcrypt.hash(user.password, 10)
  
  let sql = `
    INSERT INTO User(firstName, lastName, password, email)
    VALUES(?, ?, ?, ?)
  `

  await con.query(sql, [user.firstName, user.lastName, hashedPassword, user.email])
  return await login(user)
}

module.exports = { getAllUsers, login, register }