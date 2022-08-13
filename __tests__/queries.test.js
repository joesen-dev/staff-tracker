const Query = require("../lib/queries");

test("Returns an SQL query string to print all departments", () => {
  const printDepartments = new Query();

  expect(printDepartments.queryAllDepartments()).toEqual(expect.any(String));
});

test("Returns an SQL query string to print to formatted roles table", () => {
  const printRoles = new Query();

  expect(printRoles.queryAllRoles()).toEqual(expect.any(String));
});

test("Returns an SQL query string to print to formatted employees table", () => {
  const printEmployees = new Query();

  expect(printEmployees.queryAllEmployees()).toEqual(expect.any(String));
});
