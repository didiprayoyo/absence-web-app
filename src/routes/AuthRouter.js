import express from "express";
// const passport = require("passport"); // Extended TODO: utilize passport package
const authRouter = express.Router(); // router object

import {
  signupUser,
  loginUserByEmail,
  loginUserByName,
  logoutUser,
  notAuthYet,
} from "../controllers/AuthHandler.js";

// TODO: use middleware to check not logged in yet
// But, handle instead in frontend using react router
authRouter.post("/signup", notAuthYet, signupUser);
authRouter.post("/login-name", notAuthYet, loginUserByName);
authRouter.post("/login-email", notAuthYet, loginUserByEmail);
authRouter.delete("/logout", notAuthYet, logoutUser);

export { authRouter };
