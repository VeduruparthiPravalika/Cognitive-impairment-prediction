const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cogimp",
  password: "Pravalika@45",
  port: 5432,
});

module.exports = pool;