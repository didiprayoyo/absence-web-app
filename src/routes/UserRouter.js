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
  getSummaryOfUsers,
} = require("../controllers/UserHandler.js");
// import middleware
const { authUser, authRole, authId, decodedToken } = require("../controllers/AuthHandler.js");

const userRouter = express.Router(); // router object

// [ ]: Test API only
// ROLE[1] is admin, ROLE[2] is super admin
userRouter.get(
  "/admin-dashboard",
  decodedToken,
  authUser,
  authId([ROLE[1], ROLE[0]]),
  getSummaryOfUsers
);
userRouter.get(
  "/all-users",
  decodedToken,
  authUser,
  authRole([ROLE[1], ROLE[0]]),
  getAllUsers
);
userRouter.get(
  "/all-admins",
  decodedToken,
  authUser,
  authRole([ROLE[1], ROLE[0]]),
  getAllAdmins
);
userRouter.get(
  "/all-employees",
  decodedToken,
  authUser,
  authRole([ROLE[1], ROLE[0]]),
  getAllEmployees
);
userRouter.get("/:id", decodedToken, authUser, authId([ROLE[1], ROLE[0]]), getUser);
userRouter.post("", decodedToken, authUser, authRole([ROLE[1], ROLE[0]]), registerUser);
userRouter.put("/:id", decodedToken, authUser, authId([ROLE[1], ROLE[0]]), editUser);
userRouter.delete("/:id", decodedToken, authUser, authId([ROLE[1], ROLE[0]]), deleteUser);



module.exports = { userRouter };
