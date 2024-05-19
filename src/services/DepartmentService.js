const { pool } = require("../models/postgres-db");

const createDepartment = (dep) => {
  try {
    const sql = `INSERT INTO departments (name) VALUES ($1);`;
    pool.query(sql, [dep], (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in adding department: ${err}`,
        };
      return { Result: result, Status: true };
    });
  } catch (error) {
    return { Error: error };
  }
};

const queryListOfDepartments = () => {
  try {
    const sql = "SELECT * FROM departments";
    pool.query(sql, (err, result) => {
      if (err)
        return {
          Status: false,
          Error: "Query in getting all departments",
        };
      return { Status: true, Result: result.rows };
    });
  } catch (error) {
    return { Error: error };
  }
};

const countDepartment = () => {
  try {
    const sql = "SELECT count(id) AS dep FROM departments";
    pool.query(sql, (err, result) => {
      if (err)
        return {
          Status: false,
          Error: "Query in counting departments",
        };
      return { Status: true, Result: result.rows };
    });
  } catch (error) {
    return { Error: error };
  }
}

module.exports = { createDepartment, queryListOfDepartments, countDepartment };
