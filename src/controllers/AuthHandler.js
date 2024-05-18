const bcrypt = require("bcrypt"); // be careful of decryption, 10 is the salt
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createUser, queryUserByName } = require("../services/UserService.js");

// TODO: but access token from client header, decoded global user here
const setUser = (req, res, next) => {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
};

const signupUser = async (req, res) => {
  try {
    // TO DO: synchronize user model, use body in axios
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    id += 1;
    const user = {
      id,
      name: req.body.name,
      password: hashedPassword,
      role: "user",
    };

    createUser(user);
    res.status(201).json({ message: "Success register the user" }); // go to login page
  } catch (error) {
    res.status(500).json({ message: error }); // go to signup page
  }
};

// let refreshTokens = [];
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" }); // OR "1d"
};
const loginUser = async (req, res) => {
  // TODO: login by name or email
  const user = await queryUserByName(req.body.name);
  if (user == null) {
    return res
      .status(400)
      .json({ Error: `Cannot find user, ${req.body.name} not registered` });
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // FIXME: Be careful this query result, look at UserService
      const accessToken = generateAccessToken(user);
      //   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      //   refreshTokens.push(refreshToken);
      res.cookie("token", accessToken);
      res.json({
        AccessToken: accessToken,
        // refreshToken: refreshToken,
        Result: "Success login",
      }); // go to home page
    } else {
      res.json({ Error: "Wrong password" }); // still in login
    }
  } catch (error) {
    res.status(500).json({ message: error }); // still in login
  }
};

const logoutUser = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie("token");
  req.logOut();
  res
    .status(204)
    .json({ message: "Success logout", render: "Go to login page" });
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
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Add authorization
const authUser = (req, res, next) => {
  // TODO: get user data by decoding token, save all user data in token
  if (req.user == null) {
    res.status(403);
    return res.send("You need to sign in");
  }
  next();
};

const authRole = (roles) => {
  // TODO: get user data by decoding token, save all user data in token
  return (req, res, next) => {
    roles.forEach((role) => {
      if (req.user.role === role) {
        next();
      }
    });
    return res.status(401).send("Not allowed");
  };
};

const authId = (roles) => {
  return (req, res, next) => {
    roles.forEach((role) => {
      if (req.user.role === role) {
        next();
      }
    });
    if (req.user.id === req.params.id) {
      next();
    }
    return res.status(401).send("Not allowed");
  };
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      // TODO: synchronize this if needed, but so far no problem, we only need this for login session
      req.decoded = decoded;
      // req.user = decoded;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not authenticated" });
  }
};

export {
  setUser,
  signupUser,
  loginUser,
  logoutUser,
  authenticateToken,
  postToken,
  authUser,
  authRole,
  authId,
  verifyUser,
};
