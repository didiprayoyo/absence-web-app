const { pool } = require("../models/postgres-db");

const createDepartment = (dep) => {
  try {
    const sql = `INSERT INTO departments (name) VALUES ($1);`;
    pool.query(sql, [dep], (err, result) => {
      if (err)
        return res.json({
          Status: false,
          Error: `Query error in adding department: ${err}`,
        });
      return res.json({ Result: result, Status: true });
    });
  } catch (error) {
    return res.json({ Error: error });
  }
};

const getAllDepartment = () => {
  try {
    const sql = "SELECT * FROM departments";
    pool.query(sql, (err, result) => {
      if (err)
        return res.json({
          Status: false,
          Error: "Query in getting all departments",
        });
      return res.json({ Result: result, Status: true, Result: result.rows });
    });
  } catch (error) {
    return res.json({ Error: error });
  }
};

module.exports = { createDepartment, getAllDepartment };
