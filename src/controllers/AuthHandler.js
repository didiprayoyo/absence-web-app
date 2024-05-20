const bcrypt = require("bcrypt"); // be careful of decryption, 10 is the salt
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  createUser,
  queryUserByName,
  queryUserByEmail,
} = require("../services/UserService.js");
const { ROLE } = require("../models/UserData.js");

// TODO: but access token from client header, decoded global user here
const setUser = (req, res, next) => {
  const userId = req.body.userId;
  if (userId) {
    req.user = users.find((user) => user.id === userId);
  }
  next();
};

// [ ] debug and adjust
const signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = {
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      role: ROLE.findIndex((role) => role === req.body.role),
      // TODO: handle this image
      // req.file.filename,
      image: req.body.image,
      job_id: req.body.job_id,
    };
    const result = await createUser(values);

    // TODO: handle same email
    return res.json(result);
  } catch (error) {
    // res.status(400);
    return res.json({
      Status: false,
      Error: `Query error in register user: ${error}`,
    });
  }
};

// [ ] debug and adjust
const loginUserByEmail = async (req, res) => {
  console.log(req.body);
  const { Result } = await queryUserByEmail(req.body.email);
  let user = Result.rows;
  if (user.length === 0) {
    return res.json({
      Error: `Cannot find user with that email, ${req.body.email} not registered`,
    });
  }

  try {
    user = user[0];
    if (await bcrypt.compare(req.body.password, user.password)) {
      // FIXME: Be careful this query result, look at UserService
      const accessToken = generateAccessToken(user);
      //   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      //   refreshTokens.push(refreshToken);
      res.cookie("token", accessToken);
      return res.json({
        Status: true,
        AccessToken: accessToken,
        // refreshToken: refreshToken,
        Result: "Success login",
      }); // go to home page
    } else {
      return res.json({ Error: "Wrong password" }); // still in login
    }
  } catch (error) {
    return res.json({ Error: `${error}` }); // still in login
  }
};

// TODO: learn refreshToken for login and logout only
// let refreshTokens = [];
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" }); // OR "15s"
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
  // req.logOut();
  // res.status(204);
  return res.json({
    Result: "Success logout",
    Status: true,
    Message: "Go to login page",
  });
};

// MIDDLEWARE
// Add authorization, important for each handlers
// [x] done build this middleware
const decodedToken = (req, res, next) => {
  try {
    const user = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    // // debugging
    // console.log(req);
    // return res.json({ User: req.user });
  } catch (error) {
    // do nothing, handle to second middleware
  } finally {
    next();
  }
};

// [x] done build this middleware
const authUser = (req, res, next) => {
  if (req.user == null) {
    // res.status(403);
    return res.json({ Error: "You need to sign in" });
  }
  next();
};

// [x] done build this middleware
const authRole = (roles) => {
  return (req, res, next) => {
    // TODO: use encoded mode (integer) instead, but here is readable to debug
    // ? FIXME: why still can't use forEach to do force return?
    for (let iterate in roles) {
      console.log(ROLE[req.user.role], ROLE[iterate]);
      if (ROLE[req.user.role] == ROLE[iterate]) {
        next();
        return;
      }
    };
    // res.status(401);
    return res.json({ Error: "Not allowed" });
  };
};

// [x] done build this middleware
const authId = (roles) => {
  return (req, res, next) => {
    // TODO: use encoded mode (integer) instead, but here is readable to debug
    for (let iterate in roles) {
      // debug
      console.log(ROLE[req.user.role], ROLE[iterate]);
      if (ROLE[req.user.role] == ROLE[iterate]) {
        next();
        return;
      }
    };
    if (req.user.id == req.params.id) {
      next();
      return;
    }
    // res.status(401);
    return res.json({ Error: "Not allowed" });
  };
};

// [x] done build this middleware
const notAuthYet = (req, res, next) => {
  console.log(req.cookies.token);
  if (req.cookies.token == undefined) {
    next();
  } else {
    // res.status(403);
    return res.json({ Error: "You need to logout" });
  }
};

// Using Cookies Storage to take the token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      // TODO: synchronize this if needed, but so far no problem, we only need this for login session
      // req.decoded = decoded;
      req.user = decoded;
      return res.json({
        Status: true,
        role: ROLE[req.user.role],
        id: req.user.id,
      });
    });
  } else {
    return res.json({ Status: false, Error: "Not authenticated" });
  }
};

// Below are deprecated for awhile after I can refix and adjust to my whole backend server
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

module.exports = {
  setUser,
  signupUser,
  loginUserByEmail,
  loginUserByName,
  logoutUser,
  decodedToken,
  authUser,
  authRole,
  authId,
  notAuthYet,
  verifyUser,
  postToken,
  authenticateToken,
};
