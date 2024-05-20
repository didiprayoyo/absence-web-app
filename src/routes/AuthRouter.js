const express = require("express");
// const passport = require("passport"); // Extended TODO: utilize passport package
const authRouter = express.Router(); // router object

const {
  signupUser,
  loginUserByEmail,
  loginUserByName,
  logoutUser,
  notAuthYet,
  verifyUser,
  decodedToken,
  authUser,
} = require("../controllers/AuthHandler.js");

// TODO: use middleware to check not logged in yet
// But, handle instead in frontend using react router
// [x] done testing these routes
authRouter.post("/signup", notAuthYet, signupUser);
authRouter.post("/login-name", notAuthYet, loginUserByName);
authRouter.post("/login-email", notAuthYet, loginUserByEmail);
authRouter.delete("/logout", logoutUser);

authRouter.get("/verify", verifyUser);

// Testing middleware in my browser
authRouter.get("/token", decodedToken, authUser); // use debugging mode in func decodedToken

module.exports = { authRouter };
