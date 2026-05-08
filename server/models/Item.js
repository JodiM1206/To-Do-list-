const {query} = require("./db_connect")
async function createitemTable() {
    let sql = `
     CREATE TABLE IF NOT EXISTS item (
     item_id INT AUTO_INCREMENT PRIMARY KEY,
     item_name VARCHAR(150) NOT NULL,
     item_status BOOLEAN DEFAULT 0,
     deadline DATE,
     remind_in ENUM ( 'never', 'daily', 'weekly', 'monthly', 'yearly') DEFAULT 'never',
     user_id INT NOT NULL,
     CONSTRAINT item_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);`
    await query(sql)
}

createitemTable()
//create item function
/*
{
  item_name: "Go to the gym",
  deadline: "2024-12-31",
  remind_in: "weekly"
}
*/
async function createItem(item, user_id) {
    let sql = `
    INSERT INTO item (item_name, deadline, remind_in, user_id)
    VALUES (?, ?, ?, ?);
    `
    await query(sql, [item.item_name, item.deadline, item.remind_in, user_id])
}
//update item function
async function updateItem(item_id, item) {
    let sql = `
    UPDATE item
    SET item_name = ?, deadline = ?, remind_in = ?, item_status = ?
    WHERE item_id = ?
    `
    await query(sql, [item.item_name, item.deadline, item.remind_in, item.item_status, item_id])
}
//set item to done function
async function completedItem(item_id, item_status) {
    let sql = `
    UPDATE item SET item_status = ?
    WHERE item_id = ?
    `
    await query(sql, [item_status, item_id])
}
//delete item function
async function deleteItem(item_id) {
    let sql = `
    DELETE FROM item WHERE item_id = ?;
    `
    await query(sql, [item_id])
}
//Get all items function
async function getAllItems(user_id) {
    let sql= `
    SELECT * FROM item WHERE user_id = ?;
    `
    return await query(sql, [user_id])
}
module.exports = { createItem, getAllItems, updateItem, deleteItem, completedItem}