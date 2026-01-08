const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mysql = require("mysql2");

console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD ? "SET" : "NOT SET");
console.log("DB_NAME =", process.env.DB_NAME);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;
