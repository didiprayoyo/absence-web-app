import * as path from "path";
import { authRouter } from "./routes/AuthRouter.js";
import { userRouter } from "./routes/UserRouter.js"; // to access resolve & join specific path needed
const projectRouter = require('./routes/ProjectRouter.js');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// initialize server for (routing) controller
const app = express();

// setup config
dotenv.config();
// to jsonify query (on db) response, by res.json(<query-result>)
app.use(express.json());    // req.body
// app.use(express.urlencoded({ extended : true }));
app.use(bodyParser.urlencoded({ extended : true })); // use body-parser instead
app.use(express.static('public'));
app.use(morgan('dev'));

// URL handling
app.use("/users", userRouter);
app.use('/projects', projectRouter)
// TO DO: absen, admin-view, extended dll
// optional: profile

app.get('/', (req, res) => {
    return res.status(200).json({ message: "This is homepage" });
});

// Page not found: 404
app.use('/', (req, res) => {
    return res.status(404).json({ message: "Page Not Found" })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
