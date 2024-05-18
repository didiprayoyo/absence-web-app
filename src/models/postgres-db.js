// use postgres db
const { Pool } = require("pg");
const dotenv = require("dotenv");

// load environment variables from .env file
dotenv.config();

// create a new postgres pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// connect to the database
pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch((err) => {
    console.log(`'Error connecting to PostgreSQL database: ${err}`);
  });

module.exports = { pool };