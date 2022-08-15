class Update {
  constructor(sql) {
    this.sql = sql;
  }

  newDepartment() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = `INSERT INTO departments (name)
                        VALUES (?)`);
  }

  newRole() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = `INSERT INTO roles (title, department_id, salary)
                          VALUES (?, ?, ?)`);
  }

  newEmployee() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                          VALUES (?, ?, ?, ?)`);
  }

  updateEmployee() {
    if (this.sql === "") {
      return false;
    }
    return (this.sql = `UPDATE employees SET role_id = ? WHERE id = ?`);
  }
}

module.exports = Update;
