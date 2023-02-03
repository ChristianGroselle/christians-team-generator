const Intern = require("../lib/Intern");
const intern = new Intern("myName", "myId", "myEmail", "mySchool");

describe("Intern", () => {
  test("creates an instance of the class", () => {
    const instance = new Intern();
    expect(instance).toBeInstanceOf(Intern);
  });

  test("Returns the correct Role", () => {
    const role = intern.getRole();
    expect(role).toEqual("Intern");
  });

  test("Returns the correct name", () => {
    const name = intern.getName();
    expect(name).toEqual("myName");
  });

  test("Returns the correct id", () => {
    const id = intern.getId();
    expect(id).toEqual("myId");
  });

  test("Returns the correct email", () => {
    const email = intern.getEmail();
    expect(email).toEqual("myEmail");
  });

  test("Returns the correct school", () => {
    const school = intern.getSchool();
    expect(school).toEqual("mySchool");
  });
});
