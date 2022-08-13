// *** IMPORTS
const db = require("../db/connection");
const cTable = require("console.table");
const Departments = require("../lib/departments");

// *** DEPARTMENTS QUERIES
function queryDepartments() {
  const printDepartments = new Departments("SELECT * FROM departments");
  db.promise()
    .query(printDepartments.sql)
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log)
    .then(() => db.end());
}

module.exports = {
  queryDepartments,
};
