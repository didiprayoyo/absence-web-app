const { pool } = require("../models/postgres-db");

const createDepartment = async (dep) => {
  // TODO: return Promise
  try {
    const sql = `INSERT INTO departments (department) VALUES ($1);`;
    const result = await pool.query(sql, [dep]);
    return { Result: result, Status: true };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in adding department: ${error}`,
    };
  }
};

const queryListOfDepartments = async () => {
  // TODO: return Promise
  try {
    const sql = "SELECT * FROM departments";
    const result = await pool.query(sql);
    return { Status: true, Result: result.rows };
  } catch (error) {
    return {
      Status: false,
      Error: `Query in getting all departments: ${error}`,
    };
  }
};

const updateDepartment = async (id, updatedDepartment) => {
  const sql = "UPDATE departments SET department = $1 WHERE id = $2";
  try {
    console.log(id, updatedDepartment);
    const result = await pool.query(sql, [updatedDepartment, id]);
    return { Status: true, Result: result.rows };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in editing department: ${error}`,
    };
  }
};

const deleteDepartmentById = async (id) => {
  const sql = "DELETE FROM departments WHERE id = $1";
  try {
    const result = await pool.query(sql, [id]);
    return { Status: true, Result: result.rows };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in deleting department: ${err}`,
    };
  }
};

const countDepartment = async () => {
  try {
    const sql = "SELECT count(id) AS dep FROM departments";
    const result = await pool.query(sql);
    return { Result: result };
  } catch (error) {
    return {
      Status: false,
      Error: "Query in counting departments",
    };
  }
};

const createJob = async (job, dep_id) => {
  // TODO: return Promise
  try {
    const sql = `INSERT INTO jobs (job, dep_id) VALUES ($1, $2);`;
    const result = await pool.query(sql, [job, dep_id]);
    return { Result: result, Status: true };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in adding department: ${error}`,
    };
  }
};

const queryListOfJobs = async () => {
  // TODO: return Promise
  try {
    const sql = "SELECT * FROM jobs";
    const result = await pool.query(sql);
    return { Status: true, Result: result.rows };
  } catch (error) {
    return {
      Status: false,
      Error: `Query in getting all jobs: ${error}`,
    };
  }
};

module.exports = {
  createDepartment,
  queryListOfDepartments,
  updateDepartment,
  deleteDepartmentById,
  countDepartment,
  createJob,
  queryListOfJobs,
};
