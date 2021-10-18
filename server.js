const express = require("express");
const app = express();

const mysql = require("mysql2");
const cTable = require("console.table");

// create the connection to db
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root12345",
  database: "employee_db",
});
