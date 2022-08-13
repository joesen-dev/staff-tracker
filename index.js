const inquirer = require("inquirer");

const { queryDepartments } = require("./utils/sqlQueries");

// ********** Options **********
const promptOptions = async (optionsData) => {
  console.log(`
=================
Employee
Manager
=================
`);

  if (!optionsData) {
    optionsData = [];
  }
  await inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
      },
    ])
    .then((answersData) => {
      optionsData.push(answersData);
      if (answersData.options === "View All Departments") {
        return queryDepartments();
      }
    });
};

/** FUNCTIONS INITIALIZATION
 ************************************************************/

function init() {
  promptOptions();
}
init();
// *** PRINT DEPARTMENTS
// db.promise()
//   .query("SELECT * FROM departments")
//   .then(([rows, fields]) => {
//     const table = cTable.getTable(rows);
//     // console.log(table);
//     console.log(rows);
//   })
//   .catch(console.log)
//   .then(() => db.end());

// *** PRINT ROLES
// const sql = `SELECT
//     roles.id,
//     title,
//     name As department,
//     salary
//     FROM roles
//     INNER JOIN departments
//     ON roles.department_id = departments.id
//     `;

// db.promise()
//   .query(sql)
//   .then(([rows, fields]) => {
//     const table = cTable.getTable(rows);
//     console.log(table);
//   })
//   .catch(console.log)
//   .then(() => db.end());

// *** PRINT EMPLOYEES
// const sql2 = `SELECT
//     employees.id,
//     first_name,
//     last_name,
//     title,
//     name As department,
//     manager_id
//     FROM employees
//     INNER JOIN roles
//     ON employees.role_id = roles.id
//     INNER JOIN departments
//     ON roles.department_id = departments.id
//     `;

// db.promise()
//   .query(sql2)
//   .then(([rows, fields]) => {
//     const table = cTable.getTable(rows);
//     console.log(table);
//   })
//   .catch(console.log)
//   .then(() => db.end());
