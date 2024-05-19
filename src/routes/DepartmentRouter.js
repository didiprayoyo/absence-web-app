const express = require("express");
// import middleware
const { authUser, authRole } = require("../controllers/AuthHandler.js");
const { getAllDepartments, addDepartment } = require("../controllers/DepartmentHandler.js");

const departmentRouter = express.Router(); // router object

departmentRouter.get("/all-departments", authUser, getAllDepartments);
departmentRouter.post("", authUser, addDepartment);

module.exports = { departmentRouter };
