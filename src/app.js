// const path = require("path");
// to access resolve & join specific path needed
const { authRouter } = require("./routes/AuthRouter.js");
const { userRouter } = require("./routes/UserRouter.js");
// Extended feature
// const projectRouter = require("./routes/ProjectRouter.js");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
// using cookie: catch token to req.cookie.token & pass it to req.user
// ? cookie saved in backend or client request?
const cookieParser = require("cookie-parser");

// initialize server for (routing) controller
const app = express();

// setup config
dotenv.config();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); // req.body & res.json
// app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.urlencoded({ extended: true })); // use body-parser instead
app.use(express.static("public"));
app.use(morgan("dev"));

// Add authorization, store decoded user token in req.user
app.use(setUser());

// URL handling
app.use("/auth", authRouter);
app.use("/user", userRouter);
// TODO: attendance page, admin-view, extended features below, etc
// app.use("/project", projectRouter)
// optional: profile

app.get("/", (req, res) => {
  return res.status(200).json({ Result: "Go to start page" });
});

// Page not found: 404
app.use("/", (req, res) => {
  return res.status(404).json({ Error: "No API found for this URL" });
});

const port = process.env.NODEJS_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
