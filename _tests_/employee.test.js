const Employee = require("../lib/Employee");
const employee = new Employee("myName", "myId", "myEmail");

describe("Employee", () => {
  test("creates an instance of the class", () => {
    const instance = new Employee();
    expect(instance).toBeInstanceOf(Employee);
  });

  test("Returns the correct Role", () => {
    const role = employee.getRole();
    expect(role).toEqual("Employee");
  });

  test("Returns the correct name", () => {
    const name = employee.getName();
    expect(name).toEqual("myName");
  });

  test("Returns the correct id", () => {
    const id = employee.getId();
    expect(id).toEqual("myId");
  });

  test("Returns the correct email", () => {
    const email = employee.getEmail();
    expect(email).toEqual("myEmail");
  });
});
