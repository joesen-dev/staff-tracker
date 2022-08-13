const inquirer = require("inquirer");
const Query = require("./lib/queries");
const Update = require("./lib/updates");

const {
  sqlQueries,
  sqlInsertDepartment,
  sqlInsertRole,
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
      } else if (answersData.options === "Add Role") {
        promptAddRole();
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
      sqlInsertDepartment(addDepartment.newDepartment(), answer.departmentName);
      loopOptions();
    });
};

const promptAddRole = async () => {
  await inquirer
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
        choices: ["Sales", "Engineering", "Finance", "Legal"],
        filter: (answers) => {
          if (answers === "Sales") {
            return (answers = 1);
          }
          if (answers === "Engineering") {
            return (answers = 2);
          }
          if (answers === "Finance") {
            return (answers = 3);
          }
          if (answers === "Legal") {
            return (answers = 4);
          }
        },
      },
    ])
    .then((answer) => {
      console.log(answer);
      console.log("Added " + answer.roleName + " to the database");
      const addRole = new Update();
      sqlInsertRole(
        addRole.newRole(),
        answer.roleName,
        answer.homeDepartment,
        answer.roleSalary
      );
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
