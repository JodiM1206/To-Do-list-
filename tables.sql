SHOW DATABASES;
USE procrastinot;
SHOW TABLES;
CREATE TABLE IF NOT EXISTS users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(75) NOT NULL,
last_name VARCHAR(75) NOT NULL,
email VARCHAR(250) NOT NULL,
user_passwd VARCHAR(250) NOT NULL,
username VARCHAR(250) NOT NULL
);
CREATE TABLE IF NOT EXISTS binder (
binder_id INT AUTO_INCREMENT PRIMARY KEY,
tag VARCHAR(50),
binder_name VARCHAR(250),
user_id INT NOT NULL,
CONSTRAINT binder_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE IF NOT EXISTS to_do_list (
list_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50) NOT NULL,
list_description VARCHAR(300),
binder_id INT NOT NULL,
CONSTRAINT list_binder_id FOREIGN KEY (binder_id) REFERENCES binder(binder_id)
);
CREATE TABLE IF NOT EXISTS reminder (
remind_id INT AUTO_INCREMENT PRIMARY KEY,
remind_in ENUM ( 'never', 'daily', 'weekly', 'monthly', 'yearly') DEFAULT 'never',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
list_id INT NOT NULL,
CONSTRAINT reminder_list_id FOREIGN KEY (list_id) REFERENCES to_do_list(list_id)
);
CREATE TABLE IF NOT EXISTS item (
item_id INT AUTO_INCREMENT PRIMARY KEY,
item_name VARCHAR(150) NOT NULL,
item_status BOOLEAN DEFAULT 0,
deadline DATETIME,
list_id INT NOT NULL,
CONSTRAINT item_list_id FOREIGN KEY (list_id) REFERENCES to_do_list(list_id)
);