const { pool } = require("../models/postgres-db");
const { ROLE } = require("../models/UserData");
const { countDepartment } = require("./DepartmentService");
/**
 * Create
 * Read OR query
 * Update
 * Delete
 */

// TODO: develop CRUD for super-admin routes, use auth middleware
// TODO: for all handler, handle using try-catch for any query results
// For register new user
const createUser = async (newUser) => {
  // TODO: use Promise here return new Promise(reso);
  try {
    const formattedUser = ({ email, password, name, role, image, job_id } =
      newUser);
    const sql =
      "INSERT INTO users (email, password, name, role, image, job_id) VALUES ($1, $2, $3, $4, $5, $6)";
    const result = await pool.query(sql, Object.values(formattedUser));
    return { Status: true, Result: result };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in create new user: ${err}`,
    };
  }
};

const queryListOfUsers = () => {
  const sql = "SELECT * FROM users";
  try {
    const userList = pool.query(sql, (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in getting all users' data: ${err}`,
        };
      return { Status: true, Result: result.rows };
    });
    // FIXME: alternative return
    return { result: userList };
  } catch (error) {
    return { Error: error };
  }
};

const queryListOfUsersByRole = async (role) => {
  // All Employee Role
  const sql = "SELECT * FROM users WHERE role = $1";
  try {
    const employeeList = await pool.query(sql, [role]);
    return { Result: employeeList };
  } catch (error) {
    return { Error: error };
  }
};

const queryListOfEmployee = async () => {
  // TODO: return Promise
  // All Employee Role
  const sql = "SELECT * FROM users WHERE role = $1";
  try {
    const employeeList = await pool.query(sql, [2]);
    return { Status: true, Result: employeeList.rows };
  } catch (error) {
    return { Error: error };
  }
};

const queryUserById = async (id) => {
  // TODO: return Promise
  const sql = "SELECT * FROM users WHERE id = $1";
  try {
    const employee = await pool.query(sql, [id]);
    return { Status: true, Result: employee.rows[0] };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in getting employee detail: ${error}`,
    };
  }
};

const queryUserByEmail = async (email) => {
  // TODO: return Promise
  const sql = "SELECT * FROM users WHERE email = $1";
  try {
    const employee = await pool.query(sql, [email]);
    return { Result: employee };
  } catch (error) {
    return { Error: error };
  }
};

const queryUserByName = (name) => {
  const sql = "SELECT * FROM users WHERE name = $1";
  try {
    const employee = pool.query(sql, [name]);
    return { Result: employee };
  } catch (error) {
    return { Error: error };
  }
};

const updateUser = async (id, updatedUser) => {
  // TODO: return Promise
  const formattedUser = ({ email, name, job_id } = updatedUser);
  const sql =
    "UPDATE users SET email = $1, name = $2, job_id = $3 WHERE id = $4";
  try {
    const result = await pool.query(sql, [...Object.values(formattedUser), id]);
    console.log(formattedUser);
    return { Status: true, Result: result };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in editing employee: ${error}`,
    };
  }
};

const deleteUserById = async (id) => {
  const sql = "DELETE FROM users WHERE id = $1";
  try {
    const result = await pool.query(sql, [id]);
    return { Status: true, Result: result.rows };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in deleting employee by admin: ${err}`,
    };
    F;
  }
};

const readSummaryInfos = async () => {
  try {
    const Infos = {};
    let sql = "SELECT count(id) AS admin FROM users WHERE role = $1";
    let result = await pool.query(sql, [1]);
    Infos["countAdmin"] = result.rows[0].admin;
    
    Infos.adminList = (await queryListOfUsersByRole(1)).Result.rows;
    
    sql = "SELECT count(id) AS employee FROM users WHERE role = $1";
    result = await pool.query(sql, [2]);
    Infos.countEmployee = result.rows[0].employee;
    
    Infos.countDepartment = (await countDepartment()).Result.rows[0].dep;

    return { Status: true, Result: Infos };
  } catch (error) {
    return {
      Status: false,
      Error: `Query error in getting summary of users: ${error}`,
    };
  }
};

module.exports = {
  createUser,
  queryListOfUsers,
  queryListOfUsersByRole,
  queryListOfEmployee,
  queryUserById,
  queryUserByEmail,
  queryUserByName,
  updateUser,
  deleteUserById,
  readSummaryInfos,
};
