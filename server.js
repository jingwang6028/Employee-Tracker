// require npm packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// create the connection to db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12345",
  database: "employee_db",
});

// start the application and present with the options
function startQuestions() {
  let question = [
    {
      type: "list",
      name: "toDo",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee Role",
      ],
    },
  ];

  inquirer.prompt(question).then((answers) => {
    console.log(answers);
    handleChoice(answers);
  });
}

// handle the choices from the different answers
function handleChoice(answer) {
  if (answer.toDo == "View All Departments") {
    db.query("SELECT * FROM Department", function (err, results) {
      console.table(results);
    });
  }
}

startQuestions();
