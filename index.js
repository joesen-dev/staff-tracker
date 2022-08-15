const inquirer = require("inquirer");
// const db = require("./db/connection");
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
        promptEmployee();
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
// *** PRINT DEPARTMENTS
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
      setTimeout(promptOptions, 100);
    });
};

const promptEmployee = async () => {
  await inquirer
    .prompt([
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
        choices: [
          "Sales Lead",
          "Salesperson",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
        filter: (answers) => {
          if (answers === "Sales Lead") {
            return (answers = 1);
          }
          if (answers === "Salesperson") {
            return (answers = 2);
          }
          if (answers === "Software Engineer") {
            return (answers = 3);
          }
          if (answers === "Account Manager") {
            return (answers = 4);
          }
          if (answers === "Accountant") {
            return (answers = 5);
          }
          if (answers === "Legal Team Lead") {
            return (answers = 6);
          }
          if (answers === "Lawyer") {
            return (answers = 7);
          }
        },
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
        filter: (answers) => {
          console.log("L ", answers);
          if (answers === "John Doe") {
            return (answers = 1);
          }
          if (answers === "Mike Chan") {
            return (answers = 2);
          }
          if (answers === "Ashley Rodriguez") {
            return (answers = 3);
          }
          if (answers === "Kevin Tupik") {
            return (answers = 4);
          }
          if (answers === "Kunal Singh") {
            return (answers = 5);
          }
          if (answers === "Malia Brown") {
            return (answers = 6);
          }
          if (answers === "Sarah Lourd") {
            return (answers = 7);
          }
          if (answers === "Tom Allen") {
            return (answers = 8);
          }
        },
      },
    ])
    .then((answer) => {
      console.log(
        "Added " + answer.firstName + " " + answer.lastName + " to the database"
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
};

const promptUpdateEmployee = async () => {
  await inquirer
    .prompt([
      {
        type: "list",
        name: "employees",
        message: "Which employee's role do you want to update?",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
        filter: (answers) => {
          console.log("L ", answers);
          if (answers === "John Doe") {
            return (answers = 1);
          }
          if (answers === "Mike Chan") {
            return (answers = 2);
          }
          if (answers === "Ashley Rodriguez") {
            return (answers = 3);
          }
          if (answers === "Kevin Tupik") {
            return (answers = 4);
          }
          if (answers === "Kunal Singh") {
            return (answers = 5);
          }
          if (answers === "Malia Brown") {
            return (answers = 6);
          }
          if (answers === "Sarah Lourd") {
            return (answers = 7);
          }
          if (answers === "Tom Allen") {
            return (answers = 8);
          }
        },
      },
      {
        type: "list",
        name: "roles",
        message: "Which role do you want to assign the selected employee?",
        choices: [
          "Sales Lead",
          "Salesperson",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
        filter: (answers) => {
          if (answers === "Sales Lead") {
            return (answers = 1);
          }
          if (answers === "Salesperson") {
            return (answers = 2);
          }
          if (answers === "Software Engineer") {
            return (answers = 3);
          }
          if (answers === "Account Manager") {
            return (answers = 4);
          }
          if (answers === "Accountant") {
            return (answers = 5);
          }
          if (answers === "Legal Team Lead") {
            return (answers = 6);
          }
          if (answers === "Lawyer") {
            return (answers = 7);
          }
        },
      },
    ])
    .then((answer) => {
      console.log(answer);
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
};

/** Start App
 ************************************************************/
function init() {
  welcome().then(() => {
    return promptOptions();
  });
}
init();
