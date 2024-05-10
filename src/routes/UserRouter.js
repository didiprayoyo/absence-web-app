import express from "express";
const userRouter = express.Router(); // router object

import {
    getAllUsers, getUser,
} from "../controllers/UserHandler.js";

userRouter.get("/allUsers", getAllUsers);
userRouter.get("/user/:id", getUser);

userRouter.get('/', (req, res) => {
    res.send('Home Page')
})

userRouter.get('/dashboard', authUser, (req, res) => {
    res.send('Dashboard Page')
})

userRouter.get('/admin', authUser, authRole(ROLE.ADMIN), (req, res) => {
    res.send('Admin Page')
})

export { userRouter };