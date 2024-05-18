const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const {
  queryListOfUsers,
  queryUserById,
  createUser,
  updateUser,
  deleteUserById,
  readSummaryInfos,
} = require("../services/UserService.js");

const getAllUsers = (req, res) => {
  const userList = queryListOfUsers();

  // check log response to react axios
  return res.json(userList);
};

const getUser = (req, res) => {
  const userId = req.params.id; // passing param from axios.get
  const userData = queryUserById(userId);

  return res.json(userData);
};

// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});
// end image upload
// TODO: handle upload
// router.post("/employee", upload.single("image"), (req, res) => {
const registerUser = (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log(err);
    if (err)
      return res.json({
        Status: false,
        Error: `Query error in adding employee by admin: ${err}`,
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
}

const editUser = (req, res) => {
  const userId = req.params.id;
  const values = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    role: req.body.role,
    image: req.body.image,
    job_id: req.body.job_id,
  };
  const result = updateUser(userId, values);

  return res.json(result);
}

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const result = deleteUserById(userId);

  return res.json(result);
}

const getUserSummary = (req, res) => {
  const summary = readSummaryInfos();

  return res.json(summary);
}

module.exports = { getAllUsers, getUser, registerUser, editUser, deleteUser, getUserSummary };
