const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let team = [];

function createTeam() {
  let roleQuestion = [
    {
      type: "list",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"],
      message: "What is the team member's role?",
    },
  ];

  // Create an array of questions for inquirer to ask the user about the team member
  let questions = [
    {
      type: "input",
      name: "name",
      message: "What is the team member's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is the team member's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the team member's email address?",
    },
  ];

  inquirer.prompt(roleQuestion).then((answer) => {
    console.log("role: " + answer.role);
    let role = answer.role;
    if (role == "Manager") {
      questions.push({
        type: "input",
        name: "officeNumber",
        message: "What is the Manager's Office Number?",
      });
    } else if (role == "Engineer") {
      questions.push({
        type: "input",
        name: "github",
        message: "What is the Engineer's Github Username?",
      });
    } else {
      questions.push({
        type: "input",
        name: "school",
        message: "What is the Intern's school?",
      });
    }

    // Ask the user questions about the team member using inquirer's prompt method. Store their answers in a variable called answers.
    inquirer.prompt(questions).then((data) => {
      // Push answers into an array.
      console.log("answers: " + data.name);

      if (role == "Manager") {
        let manager = new Manager(
          data.name,
          data.id,
          data.email,
          data.officeNumber
        );
        team.push(manager);
      } else if (role == "Engineer") {
        let engineer = new Engineer(
          data.name,
          data.id,
          data.email,
          data.github
        );
        team.push(engineer);
      } else {
        let intern = new Intern(data.name, data.id, data.email, data.school);
        team.push(intern);
      }

      console.log(team);

      // Ask the user if they would like to add another team member or finish creating their team
      inquirer
        .prompt([
          {
            type: "confirm",
            name: "again",
            message: "Would you like to add another team member?",
          },
        ])
        .then((answer) => {
          // If they answer yes, run createTeam again
          if (answer.again) {
            createTeam();
          } else {
            createHTMLFile(team);
          }
        });
    });
  });
}
function generateCard(data) {
  //building the html cards in a template literal
  let role = data.getRole();
  let name = data.getName();
  let id = data.getId();
  let email = data.getEmail();
  let varString = ``;
  console.log("role again: " + role);
  if (role == "Manager") {
    varString = `<td>Office Number: ${data.getOfficeNumber()}</td>`;
  } else if (role == "Engineer") {
    varString = `<td>Github: <a href="https://github.com/${data.getGithub()}">${data.getGithub()}</td>`;
  } else {
    varString = `<td>School: ${data.getSchool()}</td>`;
  }
  return `<div class="col s5">
    <div class="card">
      <div class="card-content blue darken-1">
        <span class="card-title white-text">${name} <br> ${role}</span>
        <table class="">
            <tbody class="white">
                <tr>
                    <td>id: ${id}</td>
                </tr>
                <tr>
                    <td>Email: <a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                    ${varString}
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function createHTMLFile(members) {
  let htmlString = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      <title>Team Manager</title>
  </head>
  <body>
      <!-- Header -->
      <nav class="light-blue lighten-1" role="navigation">
          <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">My Team</a></div>
      </nav>
  
      <!-- Container --> 
      <div class="container"> 
          <!-- Content goes here --> 
          <div class="row">`;
  //generating a new card for each team member
  for (let i = 0; i < members.length; i++) {
    htmlString += `${generateCard(members[i], i + 1)}`;
  }

  htmlString += `</div>
  </div> 
</body> 
</html>`;
  //creating the html file
  fs.writeFile("./dist/team.html", htmlString, (err) => {
    if (err) throw err;
    console.log("HTML file created!");
  });
}

createTeam();
