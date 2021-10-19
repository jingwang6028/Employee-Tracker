// require npm packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// create the connection to db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root12345",
    database: "employee_db",
    multipleStatements: true,
  },
  console.log("Connecting to the database")
);

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
        "Quit",
      ],
    },
  ];

  inquirer.prompt(question).then((answers) => {
    console.log(answers);
    switch (answers.toDo) {
      case "View All Departments":
        showAllDepartments();
        break;
      case "View All Roles":
        showAllRoles();
        break;
      case "View All Employees":
        showAllEmployees();
        break;
      case "Add A Department":
        addDepartment();
        break;
      case "Add A Role":
        addRole();
        break;
      case "Add An Employee":
        addEmployee();
        break;
      case "Update An Employee Role":
        updateEmployeeRole();
        break;
      case "Quit":
        quit();
        break;
    }
  });
}

//=========================================================
// show all departments
function showAllDepartments() {
  db.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    startQuestions();
  });
}

// show all roles
function showAllRoles() {
  let query =
    "SELECT role.id, title, name AS department_name, salary FROM role JOIN department ON role.department_id = department.id";
  db.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    startQuestions();
  });
}

// show all employees
function showAllEmployees() {
  let query =
    "SELECT e.id, e.first_name, e.last_name, title, name AS department_name, salary, CONCAT(m.first_name,' ', m.last_name)AS manager FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee m ON e.manager_id = m.id";

  db.query(query, function (err, results) {
    if (err) throw err;
    console.table(results);
    startQuestions();
  });
}

// add a department to the department table
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      console.log(`Add ${answers.departmentName} to the database`);

      let query = `INSERT INTO department (name) VALUES ("${answers.departmentName}")`;
      db.query(query, function (err, results) {
        if (err) throw err;
        startQuestions();
      });
    });
}

// add a role to role table
function addRole() {
  // select all department from department table
  db.query("SELECT * FROM department", function (err, departArray) {
    if (err) throw err;
    console.log(departArray);

    // questions for add a role
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleName",
          message: "What is the name of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the role?",
        },
        {
          type: "list",
          name: "departmentName",
          message: "Which department does the role belong to?",
          choices: departArray,
        },
      ])
      .then(({ roleName, salary, departmentName }) => {
        // get the id of the departmentName
        let departID;
        for (let i = 0; i < departArray.length; i++) {
          if (departmentName == departArray[i].name) {
            departID = departArray[i].id;
            console.log(departID);
          }
        }

        // insert role into role table
        let query = `INSERT INTO role (title, department_id, salary) VALUES ("${roleName}", ${departID}, ${salary})`;

        db.query(query, (err, result) => {
          if (err) throw err;
          startQuestions();
        });
      });
  });
}

// add an employee to employee table
function addEmployee() {
  // select role id and title, and employee id and name
  let query =
    "SELECT id AS role_id, title FROM role; SELECT id AS manager_id, CONCAT(first_name, ' ', last_name) AS manager FROM employee";

  db.query(query, (err, result) => {
    let roleArray = result[0];
    let managerArray = result[1];
    console.log(roleArray, managerArray);

    // questions for add an employee
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "roleTitle",
          message: "What is the employee's role?",
          choices: roleArray,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the employee's manager",
          choices: managerArray,
        },
      ])
      .then((answers) => {});
  });
}
startQuestions();
