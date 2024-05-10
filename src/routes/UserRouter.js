import express from "express";
const userRouter = express.Router(); // router object

import {
    getAllUsers, getUser,
} from "../controllers/UserHandler.js";

userRouter.get("/allUsers", getAllUsers);
userRouter.get("/user/:id", getUser);

export { userRouter };