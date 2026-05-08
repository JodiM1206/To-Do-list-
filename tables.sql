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
CREATE TABLE IF NOT EXISTS item (
item_id INT AUTO_INCREMENT PRIMARY KEY,
item_name VARCHAR(150) NOT NULL,
item_status BOOLEAN DEFAULT 0,
deadline DATE,
remind_in ENUM ( 'never', 'daily', 'weekly', 'monthly', 'yearly') DEFAULT 'never',
user_id INT NOT NULL,
CONSTRAINT item_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);