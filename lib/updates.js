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
}

module.exports = Update;
