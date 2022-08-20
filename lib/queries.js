const db = require("../db/connection");
class Query {
  constructor(sql) {
    this.sql = sql;
  }

  queryAllDepartments() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = "SELECT * FROM departments");
  }
  queryAllRoles() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = `SELECT
                        roles.id,
                        title,
                        name As department,
                        salary
                        FROM roles
                        INNER JOIN departments
                        ON roles.department_id = departments.id`);
  }
  queryAllEmployees() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = `SELECT
                        employees.id,
                        first_name,
                        last_name,
                        title,
                        name As department,
                        manager_id
                        FROM employees
                        INNER JOIN roles
                        ON employees.role_id = roles.id
                        INNER JOIN departments
                        ON roles.department_id = departments.id`);
  }
}

module.exports = Query;
