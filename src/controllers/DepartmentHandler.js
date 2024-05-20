const {
  queryListOfDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartmentById,
  queryListOfJobs,
  createJob,
} = require("../services/DepartmentService");

const addDepartment = async (req, res) => {
  const result = await createDepartment(req.body.department);

  return res.json(result);
};

const getAllDepartments = async (req, res) => {
  const departmentList = await queryListOfDepartments();

  return res.json(departmentList);
};

const editDepartment = async (req, res) => {
  const result = await updateDepartment(req.params.id, req.body.value);

  console.log(result);
  return res.json(result);
};

const deleteDepartment = async (req, res) => {
    const result = await deleteDepartmentById(req.params.id);
    
    return res.json(result);
  };

const addJob = async (req, res) => {
  const result = await createJob(req.body.value, req.body.id);

  return res.json(result);
};

const getAllJobs = async (req, res) => {
  const jobList = await queryListOfJobs();
  
  return res.json(jobList);
};

// join table departments and jobs manually, too brute forcing, don't care about performance
// but TODO: joining table, then sort by department name, then job name, iterate each change of department then iterate each jobs
const combineDepartmentsJobs = async (req, res) => {
  const departmentList = (await queryListOfDepartments()).Result;
  const jobList = (await queryListOfJobs()).Result;
  departmentList.forEach((dep) => {
    dep.jobs = [];
    jobList.forEach((j) => {
      if (j.dep_id === dep.id) {
        dep.jobs.push(j.job);
      }
    });
  });

  console.log(departmentList);
  return res.json({ Status: true, Result: departmentList });
};

module.exports = {
  addDepartment,
  getAllDepartments,
  editDepartment,
  deleteDepartment,
  addJob,
  getAllJobs,
  combineDepartmentsJobs,
};
