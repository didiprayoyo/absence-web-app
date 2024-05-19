const bcrypt = require("bcrypt"); // be careful of decryption, 10 is the salt
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createUser, queryUserByName, queryUserByEmail } = require("../services/UserService.js");

// TODO: but access token from client header, decoded global user here
const setUser = (req, res, next) => {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
};

// TODO: copy from UserController
const signupUser = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log(err);
    if (err)
      return res.json({
        Status: false,
        Error: `Query error in adding user: ${err}`,
      });

    const values = {
      email: req.body.email,
      password: hash,
      name: req.body.name,
      role: req.body.role,
      // TODO: handle this image
      // req.file.filename,
      image: req.body.image,
      job_id: req.body.job_id,
    };
    const result = createUser(values);
  
    return res.json(result);
  });
};

const loginUserByEmail = async (req, res) => {
  // TODO: login by name or email
  const user = await queryUserByEmail(req.body.email);
  if (user == null) {
    return res
      .status(400)
      .json({ Error: `Cannot find user with that email, ${req.body.email} not registered` });
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
    res.status(500).json({ Error: error }); // still in login
  }
};

// TODO: learn refreshToken for login and logout only
// let refreshTokens = [];
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" }); // OR "1d"
};
const loginUserByName = async (req, res) => {
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
    res.status(500).json({ Error: error }); // still in login
  }
};

const logoutUser = (req, res) => {
  // TODO: extended learn refreshToken
  // refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie("token");
  req.logOut();
  res
    .status(204)
    .json({ Result: "Success logout", Status: "Go to login page" });
};

// TODO: learn more time, using refresh token here
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
// Add authorization, important for each handlers
const authUser = (req, res, next) => {
  // TODO: get user data by decoding token, save all user data in token
  if (req.user == null) {
    return res.status(403).send("You need to sign in");
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
  // TODO: get user data by decoding token, save all user data in token
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

const notAuthYet = (req, res, next) => {
  // TODO: get user data by decoding token, save all user data in token
  if (req.user == null) {
    next();
  }
  return res.status(403).send("You need to logout");
};

// Using Cookies Storage to take the token
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

// Using Local Storage of headers["authorization"] to take the token
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

export {
  setUser,
  signupUser,
  loginUserByEmail,
  loginUserByName,
  logoutUser,
  postToken,
  authUser,
  authRole,
  authId,
  notAuthYet,
  verifyUser,
  authenticateToken,
};
