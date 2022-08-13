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
}

module.exports = Update;
