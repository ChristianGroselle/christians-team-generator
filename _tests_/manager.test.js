const Manager = require("../lib/Manager");
const manager = new Manager("myName", "myId", "myEmail", "myOffice");

describe("Manager", () => {
  test("creates an instance of the class", () => {
    const instance = new Manager();
    expect(instance).toBeInstanceOf(Manager);
  });

  test("Returns the correct Role", () => {
    const role = manager.getRole();
    expect(role).toEqual("Manager");
  });

  test("Returns the correct name", () => {
    const name = manager.getName();
    expect(name).toEqual("myName");
  });

  test("Returns the correct id", () => {
    const id = manager.getId();
    expect(id).toEqual("myId");
  });

  test("Returns the correct email", () => {
    const email = manager.getEmail();
    expect(email).toEqual("myEmail");
  });

  test("Returns the correct Office Number", () => {
    const officeNumber = manager.getOfficeNumber();
    expect(officeNumber).toEqual("myOffice");
  });
});
