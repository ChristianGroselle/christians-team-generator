const inquirer = require("inquirer");
const fs = require("fs");

let team = [];

function createTeam() {
  // Create an array of questions for inquirer to ask the user about the team member
  let questions = [
    {
      type: "input",
      name: "name",
      message: "What is the team member's name?",
    },
    {
      type: "input",
      name: "role",
      message: "What is the team member's role?",
    },
    {
      type: "input",
      name: "email",
      message: "What is the team member's email address?",
    },
    {
      type: "input",
      name: "github",
      message: "what is the team members Github?",
    },
  ];

  // Ask the user questions about the team member using inquirer's prompt method. Store their answers in a variable called answers.
  inquirer.prompt(questions).then((answers) => {
    // Push answers into an array.
    team.push(answers);

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
          console.log("Your Team:");
          team.forEach((member) =>
            console.log(
              `Name: ${member.name}, Role: ${member.role}, Email Address: ${member.email}`
            )
          );
        }
      });
  });
}
function generateCard(data, id) {
  //building the html cards in a template literal
  return `<div class="col s4">
    <div class="card">
      <div class="card-content blue darken-1">
        <span class="card-title white-text">${data.name} <br> ${data.role}</span>
        <table class="">
            <tbody class="white">
                <tr>
                    <td>id: ${id}</td>
                </tr>
                <tr>
                    <td>Email: <a href="mailto:${data.email}">${data.email}</a></td>
                </tr>
                <tr>
                    <td>Github: <a href="${data.github}">${data.github}</td>
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
  fs.writeFile("team.html", htmlString, (err) => {
    if (err) throw err;
    console.log("HTML file created!");
  });
}

createTeam();
