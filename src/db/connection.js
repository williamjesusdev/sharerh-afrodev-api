const mysql = require("mysql");

const connection = mysql.createConnection({
  port: process.env.DB_PORT || 3306,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "william",
  database: process.env.DB_DATABASE || "afrodev_agenda",
});

module.exports = connection;
