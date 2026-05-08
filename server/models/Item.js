const con = require("./db_connect")
async function createitemTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS item (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(150) NOT NULL,
    item_status BOOLEAN DEFAULT 0,
    deadline DATETIME,
    list_id INT NOT NULL,
    CONSTRAINT item_list_id FOREIGN KEY (list_id) REFERENCES to_do_list(list_id) ON DELETE CASCADE
);`

createitemTable()

/*
{
  item_name: "Go to the gym",
  deadline: "2024-12-31 23:59:59",
}
*/

    await con.query(sql)
}
module.exports = { createItem, getItem, updateItem, deleteItem }