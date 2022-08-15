const db = require("../db/connection");
const cTable = require("console.table");

// *** QUERIES
function sqlQueries(promptOptions) {
  db.promise()
    .query(promptOptions)
    .then(([rows, fields]) => {
      console.table(rows);
    })
    .catch(console.log);
  // .then(() => db.end());
}

// *** INSERTS
function sqlInsertDepartment(answer, name) {
  const params = [name];
  db.promise()
    .query(answer, params, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log);
  // .then(() => db.end());
}

// *** Add Role
function sqlInsertRole(answer, title, department_id, salary) {
  const params = [title, department_id, salary];
  db.promise()
    .query(answer, params, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log);
  // .then(() => db.end());
}

// *** Add Employee
function sqlInsertEmployee(
  answer,
  title,
  first_name,
  last_name,
  role_id,
  manager_id
) {
  const params = [title, first_name, last_name, role_id, manager_id];
  db.promise()
    .query(answer, params, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log);
  // .then(() => db.end());
}

// *** Update Employee
function sqlUpdateEmployee(answer, employeeID, roleBeingUpdated) {
  const params = [roleBeingUpdated, employeeID];
  db.promise()
    .query(answer, params, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log);
  // .then(() => db.end());
}

module.exports = {
  sqlQueries,
  sqlInsertDepartment,
  sqlInsertRole,
  sqlInsertEmployee,
  sqlUpdateEmployee,
};
