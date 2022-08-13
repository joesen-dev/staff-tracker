const inquirer = require("inquirer");
const Query = require("./lib/queries");

const { sqlQueries } = require("./utils/sqlQueries");

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
      const quit = Boolean;
      if (answersData.options === "View All Departments") {
        const printDepartments = new Query();
        sqlQueries(printDepartments.queryAllDepartments());
      } else if (answersData.options === "View All Roles") {
        const printRoles = new Query();
        sqlQueries(printRoles.queryAllRoles());
      } else if (answersData.options === "View All Employees") {
        const printEmployees = new Query();
        sqlQueries(printEmployees.queryAllEmployees());
      }
      loopOptions();
    });
};

function loopOptions() {
  promptOptions();
}

/** FUNCTIONS INITIALIZATION
 ************************************************************/
function init() {
  welcome().then(() => {
    return promptOptions();
  });
}
init();
