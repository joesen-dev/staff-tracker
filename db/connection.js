const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root", // Your MySQL username,
    password: "", // Your MySQL password
    database: "company_db",
  },
  console.log("Connected to the election database.")
);

module.exports = db;
