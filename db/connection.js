const mysql = require("mysql2");

require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root", // Your MySQL username,
    password: process.env.DB_PASSWORD, // Your MySQL password
    database: process.env.DB_NAME,
  },
  console.log("Connected to the election database.")
);

module.exports = db;
