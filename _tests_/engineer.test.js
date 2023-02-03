const Engineer = require("../lib/Engineer");
const engineer = new Engineer("myName", "myId", "myEmail", "myGithub");

describe("Engineer", () => {
  test("creates an instance of the class", () => {
    const instance = new Engineer();
    expect(instance).toBeInstanceOf(Engineer);
  });

  test("Returns the correct Role", () => {
    const role = engineer.getRole();
    expect(role).toEqual("Engineer");
  });

  test("Returns the correct name", () => {
    const name = engineer.getName();
    expect(name).toEqual("myName");
  });

  test("Returns the correct id", () => {
    const id = engineer.getId();
    expect(id).toEqual("myId");
  });

  test("Returns the correct email", () => {
    const email = engineer.getEmail();
    expect(email).toEqual("myEmail");
  });

  test("Returns the correct github", () => {
    const github = engineer.getGithub();
    expect(github).toEqual("myGithub");
  });
});
