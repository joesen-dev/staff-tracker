const Update = require("../lib/updates");

test("Returns an SQL query string to add a new department", () => {
  const addDepartment = new Update();

  expect(addDepartment.newDepartment()).toEqual(expect.any(String));
});

test("Returns an SQL query string to add a new role", () => {
  const addRole = new Update();

  expect(addRole.newRole()).toEqual(expect.any(String));
});
