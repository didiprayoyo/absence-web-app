const bcrypt = require("bcrypt"); // awas kena decrypt, 10 itu kode apa??
const jwt = require("jsonwebtoken");
require("dotenv").config();
import { id } from "../services/UserData.js";
import {
    registerUser, queryUserByName
} from "../services/AuthService.js";

const signupUser = async (req, res) => {
    try {
        // TO DO: synchronize user model, use body in axios
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        id += 1;
        const user = { id, name: req.body.name, password: hashedPassword };

        registerUser(user);
        res.status(201).json({ message: "Success register the user"}); // go to login page
    } catch (error) {
        res.status(500).json({ message: error }); // go to signup page
    }
};

let refreshTokens = []
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
};
const loginUser = async (req, res) => {
    const user = queryUserByName(req.body.name);
    if (user == null) {
        return res.status(400).json({ message: "Cannot find user"});
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            refreshTokens.push(refreshToken);
            res.json({ accessToken: accessToken, refreshToken: refreshToken, message: "Success login" }); // go to home page
        } else {
            res.json({ message: "Wrong password" }); // still in login
        }
    } catch (error) {
        res.status(500).json({ message: error }); // still in login
    }
};

const logoutUser = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token);
    res.sendStatus(204);
    req.logOut();
    res.json({ message: "Succes logout", render: "Go to login page" });
};

const postToken = (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.sendStatus(401);
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    });
};

// MIDDLEWARE
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403);
        req.user = user
        next()
    })
}

// Using Passport: handle this in frontend react-router
checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({ message: "Not authenticated", render: "Go to login page" });
}
  
checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.json({ message: "Already authenticated", render: "Go to home page" });
    }
    next()
}

export { signupUser, loginUser, logoutUser, checkAuthenticated, checkNotAuthenticated, authenticateToken, postToken, };