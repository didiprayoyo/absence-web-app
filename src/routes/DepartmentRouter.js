const express = require("express");
// import middleware
const { authUser, decodedToken } = require("../controllers/AuthHandler.js");
const {
  addDepartment,
  getAllDepartments,
  editDepartment,
  addJob,
  getAllJobs,
  combineDepartmentsJobs,
  deleteDepartment,
} = require("../controllers/DepartmentHandler.js");

const departmentRouter = express.Router(); // router object

departmentRouter.get(
  "/all-departments",
  decodedToken,
  authUser,
  getAllDepartments
);
departmentRouter.post("", decodedToken, authUser, addDepartment);
departmentRouter.put("/department/:id", decodedToken, authUser, editDepartment);
departmentRouter.delete("/department/:id", decodedToken, authUser, deleteDepartment);

departmentRouter.get("/all-jobs", decodedToken, authUser, getAllJobs);
departmentRouter.post("/job", decodedToken, authUser, addJob);
// departmentRouter.put("/department/:id", decodedToken, authUser, editDepartment);

departmentRouter.get(
  "/departments-jobs",
  decodedToken,
  authUser,
  combineDepartmentsJobs
);

module.exports = { departmentRouter };
