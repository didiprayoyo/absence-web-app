const express = require("express");
const { ROLE } = require("../models/UserData.js");
const {
  getAllUsers,
  getAllAdmins,
  getAllEmployees,
  getUser,
  registerUser,
  editUser,
  deleteUser,
  getUserSummary,
} = require("../controllers/UserHandler.js");
// import middleware
const { authUser, authRole } = require("../controllers/AuthHandler.js");

const userRouter = express.Router(); // router object

// [ ]: Test API only
// ROLE[1] is admin, ROLE[2] is super admin
userRouter.get(
  "/all-users",
  authUser,
  authRole([ROLE[1], ROLE[2]]),
  getAllUsers
);
userRouter.get(
  "/all-admins",
  authUser,
  authRole([ROLE[1], ROLE[2]]),
  getAllAdmins
);
userRouter.get(
  "/all-employees",
  authUser,
  authRole([ROLE[1], ROLE[2]]),
  getAllEmployees
);
userRouter.get("/:id", authUser, authId([ROLE[1], ROLE[2]]), getUser);
userRouter.post("", authUser, authRole([ROLE[1], ROLE[2]]), registerUser);
userRouter.put("/:id", authUser, authId([ROLE[1], ROLE[2]]), editUser);
userRouter.delete("/:id", authUser, authId([ROLE[1], ROLE[2]]), deleteUser);

userRouter.get(
  "/admin-dashboard",
  authUser,
  authId([ROLE[1], ROLE[2]]),
  getUserSummary
);

module.exports = { userRouter };
