const mysql = require("mysql2");
const cTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root", // Your MySQL username,
    password: "", // Your MySQL password
    database: "company_db",
  },
  console.log("Connected to the Company database.")
);

// *** PRINT DEPARTMENTS
db.promise()
  .query("SELECT * FROM departments")
  .then(([rows, fields]) => {
    const table = cTable.getTable(rows);
    console.log(table);
  })
  .catch(console.log)
  .then(() => db.end());

// *** PRINT ROLES
const sql = `SELECT
    roles.id,
    title,
    name As department,
    salary
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id
    `;

db.promise()
  .query(sql)
  .then(([rows, fields]) => {
    const table = cTable.getTable(rows);
    console.log(table);
  })
  .catch(console.log)
  .then(() => db.end());

// *** PRINT EMPLOYEES
const sql2 = `SELECT
    employees.id,
    first_name,
    last_name,
    title,
    name As department,
    manager_id
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.id
    INNER JOIN departments
    ON roles.department_id = departments.id    
    `;

db.promise()
  .query(sql2)
  .then(([rows, fields]) => {
    const table = cTable.getTable(rows);
    console.log(table);
  })
  .catch(console.log)
  .then(() => db.end());
