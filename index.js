const inquirer = require("inquirer");
const Query = require("./lib/queries");
const Update = require("./lib/updates");

const { sqlQueries, sqlInsert } = require("./utils/sqlQueries");

const welcome = async () => {
  console.log(`
=================
Employee
Manager
=================
`);
};

// ********** Options **********
const promptOptions = async (optionsData) => {
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
        getDepartments();
      } else if (answersData.options === "View All Roles") {
        getRoles();
      } else if (answersData.options === "View All Employees") {
        getEmployees();
      } else if (answersData.options === "Add Department") {
        promptAddDepartment();
      }
    });
};

// *** PRINT DEPARTMENTS
const getDepartments = async () => {
  const printDepartments = new Query();
  sqlQueries(printDepartments.queryAllDepartments());
  loopOptions();
};
// *** PRINT DEPARTMENTS
const getRoles = async () => {
  const printRoles = new Query();
  sqlQueries(printRoles.queryAllRoles());
  loopOptions();
};
// *** PRINT EMPLOYEES
const getEmployees = async () => {
  const printEmployees = new Query();
  sqlQueries(printEmployees.queryAllEmployees());
  loopOptions();
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
      sqlInsert(addDepartment.newDepartment(), answer.departmentName);
      loopOptions();
    });
};

function loopOptions() {
  promptOptions();
}

/** Start App
 ************************************************************/
function init() {
  welcome().then(() => {
    return promptOptions();
  });
}
init();
