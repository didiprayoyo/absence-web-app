import express from "express";
const passport = require("passport");
const authRouter = express.Router(); // router object

import {
    signupUser, loginUser, logoutUser, checkAuthenticated, checkNotAuthenticated, authenticateToken, postToken, 
} from "../controllers/AuthHandler.js";

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.delete('/logout', logoutUser);

authRouter.post('/token', postToken);



// TO DO: getPosts in AuthHandler or move to UserHandler
const posts = [
    {
      username: 'Kyle',
      title: 'Post 1'
    },
    {
      username: 'Jim',
      title: 'Post 2'
    }
];
const getPosts = (req, res) => {
    return res.json(posts.filter(post => post.username === req.user.name));
}
authRouter.get('/posts', authenticateToken, getPosts);

// using Passport

// TO DO: without /auth route
app.get('/', checkAuthenticated, (req, res) => {
    res.json({ message: "Already authenticated", render: "Go to home page" });
});

// handle this page in frontend Routes
// app.get('/login', checkNotAuthenticated, (req, res) => {
//     res.render('login.ejs')
// });
  
// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
// }));

// app.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('register.ejs')
// })
  
// app.post('/register', checkNotAuthenticated, async (req, res) => {
//     try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPassword
//     })
//     res.redirect('/login')
//     } catch {
//     res.redirect('/register')
//     }
// })

export { authRouter };