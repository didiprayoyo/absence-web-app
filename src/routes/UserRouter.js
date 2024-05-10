import express from "express";
const userRouter = express.Router(); // router object

import {
    getAllUsers, getUser,
} from "../controllers/UserHandler.js";

router.get("/allUsers", getAllUsers);
router.get("/user/:id", getUser);

export { userRouter };