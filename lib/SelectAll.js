const db = require("../db/connection");

class SelectAll {
  constructor(sql) {
    this.sql = sql;
  }

  selectAllDepartments() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = "SELECT * FROM departments");
  }

  selectAllRoles() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = "SELECT * FROM role");
  }

  selectAllEmployees() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = "SELECT * FROM employees");
  }
}

module.exports = SelectAll;
