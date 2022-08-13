// *** IMPORTS
const db = require("../db/connection");
const cTable = require("console.table");

// *** QUERIES
function sqlQueries(promptOptions) {
  db.promise()
    .query(promptOptions)
    .then(([rows, fields]) => {
      const table = cTable.getTable(rows);
      console.log(table);
    })
    .catch(console.log);
  // .then(() => db.end());
}

// *** INSERTS

function sqlInsert(answer, name) {
  const params = [name];
  db.promise()
    .query(answer, params, (err, rows) => {
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
  sqlInsert,
};
