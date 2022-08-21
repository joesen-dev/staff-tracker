const inquirer = require("inquirer");
const db = require("./db/connection");
const Query = require("./lib/queries");
const Update = require("./lib/updates");

const {
  sqlQueries,
  sqlInsertDepartment,
  sqlInsertRole,
  sqlInsertEmployee,
  sqlUpdateEmployee,
} = require("./utils/sqlQueries");

const welcome = async () => {
  console.log(`
=================
Employee
Manager
=================
`);
};

// ********** Options **********
const promptOptions = async () => {
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
          "Update Employee Role",
          "Quit",
        ],
      },
    ])
    .then((answersData) => {
      if (answersData.options === "View All Departments") {
        getDepartments();
        setTimeout(promptOptions, 100);
      } else if (answersData.options === "View All Roles") {
        getRoles();
        setTimeout(promptOptions, 100);
      } else if (answersData.options === "View All Employees") {
        getEmployees();
        setTimeout(promptOptions, 100);
      } else if (answersData.options === "Add Department") {
        promptAddDepartment();
      } else if (answersData.options === "Add Role") {
        promptAddRole();
      } else if (answersData.options === "Add Employee") {
        promptAddEmployee();
      } else if (answersData.options === "Update Employee Role") {
        promptUpdateEmployee();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log(error);
      }
    });
};

// *** PRINT DEPARTMENTS
const getDepartments = async () => {
  const printDepartments = new Query();
  sqlQueries(printDepartments.queryAllDepartments());
};
// *** PRINT ROLES
const getRoles = async () => {
  const printRoles = new Query();
  sqlQueries(printRoles.queryAllRoles());
};
// *** PRINT EMPLOYEES
const getEmployees = async () => {
  const printEmployees = new Query();
  sqlQueries(printEmployees.queryAllEmployees());
};

const promptAddDepartment = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answer) => {
      console.log("Added " + answer.departmentName + " to the database");
      const addDepartment = new Update();
      sqlInsertDepartment(addDepartment.newDepartment(), answer.departmentName);
      setTimeout(promptOptions, 100);
    });
};

const promptAddRole = async () => {
  async function viewTables(tablesArray) {
    const departmentsTable = `SELECT * FROM departments`;
    await db
      .promise()
      .query(departmentsTable)
      .then(([rows, fields]) => {
        let row = rows.map((getTableName) => {
          return {
            value: getTableName.id,
            name: getTableName.name,
          };
        });
        return row;
      })
      .catch(console.log)
      .then((row) => {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "roleName",
              message: "What is the name of the role?",
              validate: (answers) => {
                if (answers) {
                  return true;
                } else {
                  console.log("Please enter role name!");
                  return false;
                }
              },
            },
            {
              type: "input",
              name: "roleSalary",
              message: "What is the salary of the role?",
              validate: (answers) => {
                let value = answers;
                let isNum = /^\d+$/.test(value);

                if (isNum) {
                  return true;
                } else {
                  console.log("Please enter a valid salary!");
                }
              },
            },
            {
              type: "list",
              name: "homeDepartment",
              message: "Which department does the role belong to?",
              choices: row,
            },
          ])
          .then((answer) => {
            console.log("Added " + answer.roleName + " to the database");
            const addRole = new Update();
            sqlInsertRole(
              addRole.newRole(),
              answer.roleName,
              answer.homeDepartment,
              answer.roleSalary
            );
            setTimeout(promptOptions, 100);
          });
      });
  }
  viewTables();
};

const promptAddEmployee = async () => {
  async function viewTables(tablesArray) {
    const rolesTable = `SELECT * FROM roles`;
    await db
      .promise()
      .query(rolesTable)
      .then(([rows, fields]) => {
        let roles = rows.map((getTableName) => {
          return {
            name: getTableName.title,
            value: getTableName.id,
          };
        });
        console.log("roles");
        console.log(roles);
        return roles;
      })
      .catch(console.log)
      .then((roles) => {
        return inquirer.prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
            validate: (answers) => {
              if (answers) {
                return true;
              } else {
                console.log("Please enter the employee first name!");
                return false;
              }
            },
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
            validate: (answers) => {
              if (answers) {
                return true;
              } else {
                console.log("Please enter the employee last name!");
                return false;
              }
            },
          },
          {
            type: "list",
            name: "employeeRole",
            message: "What is the employee's role?",
            choices: roles,
          },
          {
            type: "input",
            name: "manager",
            message:
              "Who is the employee's manager? You will need to enter that manager's ID for the database to update",
            validate: (answers) => {
              let value = answers;
              let isNum = /^\d+$/.test(value);

              if (isNum) {
                return true;
              } else {
                console.log("Please enter a valid manager ID!");
              }
            },
          },
        ]);
      })
      .then((answer) => {
        console.log(
          "Added " +
            answer.firstName +
            " " +
            answer.lastName +
            " to the database"
        );
        const addEmployee = new Update();
        sqlInsertEmployee(
          addEmployee.newEmployee(),
          answer.firstName,
          answer.lastName,
          answer.employeeRole,
          answer.manager
        );
        setTimeout(promptOptions, 100);
      });
  }
  viewTables();
};

const promptUpdateEmployee = async () => {
  async function viewTables(tablesArray) {
    const employeesTable = `SELECT * FROM employees ORDER BY first_name`;
    await db
      .promise()
      .query(employeesTable)
      .then(([rows, fields]) => {
        let employees = rows.map((getTableName) => {
          return {
            name: getTableName.first_name + " " + getTableName.last_name,
            value: getTableName.id,
          };
        });
        console.log("employees");
        console.log(employees);
        return employees;
      })
      .catch(console.log)
      .then((employees) => {
        return inquirer.prompt([
          {
            type: "list",
            name: "employees",
            message: "Which employee's role do you want to update?",
            choices: employees,
          },
          {
            type: "input",
            name: "roles",
            message:
              "Enter the ID of the role you want to assign the selected employee?",
          },
        ]);
      })
      .then((answer) => {
        console.log("Updated employee's role");
        const updateRole = new Update();
        sqlUpdateEmployee(
          updateRole.updateEmployee(),
          answer.employees,
          answer.roles,
          answer.roleSalary
        );
        setTimeout(promptOptions, 100);
      });
  }
  viewTables();
};

/** Start App
 ************************************************************/
function init() {
  welcome().then(() => {
    return promptOptions();
  });
}
init();
