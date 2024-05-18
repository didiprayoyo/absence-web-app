const { pool } = require("../models/postgres-db");
const { ROLE } = require("../models/UserData");
/**
 * Create
 * Read OR query
 * Update
 * Delete
 */

// TODO: develop CRUD for super-admin routes, use auth middleware
// TODO: for all handler, handle using try-catch for any query results
// For register new user
const createUser = (newUser) => {
  const formattedUser = ({ email, password, name, role, image, job_id } =
    newUser);
  const sql =
    "INSERT INTO users (email, password, name, role, image, job_id) VALUES ($1, $2, $3, $4, $5, $6)";
  try {
    const result = pool.query(
      sql,
      Object.values(formattedUser),
      (err, result) => {
        if (err)
          return {
            Status: false,
            Error: `Query error in create new user: ${err}`,
          };
        return { Status: true, Result: result };
      }
    );
    return { Result: result };
  } catch (error) {
    return { Error: error };
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

const queryListOfUsersByRole = (role) => {
  // All Employee Role
  const sql = "SELECT * FROM users WHERE role = $1";
  try {
    const employeeList = pool.query(sql, [role]);
    return { Result: employeeList };
  } catch (error) {
    return { Error: error };
  }
};

const queryListOfEmployee = () => {
  // All Employee Role
  const sql = "SELECT * FROM users WHERE role = $1";
  try {
    const employeeList = pool.query(sql, [ROLE[1]]);
    return { Result: employeeList };
  } catch (error) {
    return { Error: error };
  }
};

const queryUserById = (id) => {
  const sql = "SELECT * FROM users WHERE id = $1";
  try {
    const employee = pool.query(sql, [id], (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in getting employee detail: ${err}`,
        };
      // TODO: handle not found (result.rows === 0)
      return { Status: true, Result: result.rows };
    });
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

const updateUser = (id, updatedUser) => {
  const formattedUser = ({ email, password, name, role, image, job_id } =
    updatedUser);
  const sql =
    "UPDATE users SET email = $1, password = $2, name = $3, role = $4, image = $5, job_id = $6) WHERE id = $7";
  try {
    const result = pool.query(sql, [...formattedUser, id], (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in editing employee: ${err}`,
        };
      return { Status: true, Result: result.rows };
    });
    // FIXME: alternative return
    return { Result: result };
  } catch (error) {
    return { Error: error };
  }
};

const deleteUserById = (id) => {
  const sql = "DELETE FROM users WHERE id = $1";
  try {
    const result = pool.query(sql, [id], (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in deleting employee by admin: ${err}`,
        };
      return { Status: true, Result: result.rows };
    });
    // FIXME: alternative return
    return { Result: result };
  } catch (error) {
    return { Error: error };
  }
};

const readSummaryInfos = () => {
  try {
    const Infos = {};
    let sql = "SELECT count(id) AS admin FROM users WHERE role = $1";
    pool.query(sql, [ROLE[1]], (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in counting admin: ${err}`,
        };
      Infos.CountAdmin = result.rows.admin;
    });

    sql = "SELECT count(id) AS employee FROM users WHERE role = $1";
    pool.query(sql, [ROLE[2]], (err, result) => {
      if (err)
        return {
          Status: false,
          Error: `Query error in counting employee: ${err}`,
        };
      Infos.CountEmployee = result.rows.employee;
    });

    return { Status: true, Result: Infos };
  } catch (error) {
    {
      Error: error;
    }
  }
};

module.exports = {
  createUser,
  queryListOfUsers,
  queryListOfUsersByRole,
  queryListOfEmployee,
  queryUserById,
  queryUserByName,
  updateUser,
  deleteUserById,
  readSummaryInfos,
};
