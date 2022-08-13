const Update = require("../lib/updates");

test("Returns an SQL query string to add a department", () => {
  const addDepartment = new Update();

  expect(addDepartment.newDepartment()).toEqual(expect.any(String));
});
