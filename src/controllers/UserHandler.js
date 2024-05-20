const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const {
  queryListOfUsers,
  queryListOfUsersByRole,
  queryListOfEmployee,
  queryUserById,
  createUser,
  updateUser,
  deleteUserById,
  readSummaryInfos,
} = require("../services/UserService.js");
const { ROLE } = require("../models/UserData.js");

const getAllUsers = (req, res) => {
  const userList = queryListOfUsers();

  // check log response to react axios
  return res.json(userList);
};

const getAllAdmins = (req, res) => {
  const adminList = queryListOfUsersByRole(ROLE[1]);

  return res.json(adminList);
};

const getAllEmployees = async (req, res) => {
  const employeeList = await queryListOfEmployee();

  console.log(employeeList);
  return res.json(employeeList);
};

const getUser = async (req, res) => {
  const userId = req.params.id; // passing param from axios.get
  const userData = await queryUserById(userId);

  console.log(userData);
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
const registerUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const values = {
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      role: req.body.role,
      // TODO: handle this image
      // req.file.filename,
      image: req.body.image,
      job_id: req.body.job_id,
    };
    const result = await createUser(values);

    return res.json(result);
  } catch (error) {
    return res.json({
      Status: false,
      Error: `Query error in adding employee by admin: ${error}`,
    });
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;
  const values = {
    email: req.body.email,
    // password: req.body.password,
    name: req.body.name,
    // role: req.body.role,
    // image: req.body.image,
    job_id: req.body.job_id,
  };
  const result = await updateUser(userId, values);

  return res.json(result);
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const result = await deleteUserById(userId);

  console.log(result);
  return res.json(result);
};

const getSummaryOfUsers = async (req, res) => {
  const summary = await readSummaryInfos();
  
  return res.json(summary);
};

module.exports = {
  getAllUsers,
  getAllAdmins,
  getAllEmployees,
  getUser,
  registerUser,
  editUser,
  deleteUser,
  getSummaryOfUsers,
};
