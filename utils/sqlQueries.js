// *** IMPORTS
const db = require("../db/connection");
const cTable = require("console.table");

// *** QUERIES
function sqlQueries(promptOptions) {
  // const printDepartments = new Departments("SELECT * FROM departments");
  db.promise()
    .query(promptOptions)
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log);
  // .then(() => db.end());
}

module.exports = {
  sqlQueries,
};
