const Departments = require("../lib/departments");

test("Prints an SQL query string", () => {
  const printDepartments = new Departments("SELECT * FROM departments");

  expect(printDepartments.sql).toEqual(expect.any(String));
});
