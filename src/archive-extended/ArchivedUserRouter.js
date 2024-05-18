const userRouter = require("express").Router();

userRouter.get("/dashboard", authUser, (req, res) => {
  res.send("Dashboard Page");
});
userRouter.get("/", (req, res) => {
  res.send("Home Page");
});
// ROLE[1] is admin, handle this in frontend using react router
userRouter.get("/admin", authUser, authRole(ROLE[1]), (req, res) => {
  res.send("Admin Page");
});
