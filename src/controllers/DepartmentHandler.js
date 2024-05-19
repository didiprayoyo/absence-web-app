const {queryListOfDepartments, createDepartment } = require("../services/DepartmentService")

const getAllDepartments = (req, res) => {
    const departmentList = queryListOfDepartments();

    return res.json(departmentList);
}

const addDepartment = (req, res) => {
    const result = createDepartment(req.body.department);

    return res.json(result);
}

module.exports = { getAllDepartments, addDepartment };