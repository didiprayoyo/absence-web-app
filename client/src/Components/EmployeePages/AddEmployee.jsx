import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    email: "",
    password: "",
    name: "",
    role: 2, // auto employee by admin
    image: "",
    job_id: 0,
  });
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/department/all-departments")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // TODO: unhardcode this push method using loop with [indexed-obj], I forget the term :"(, review w3
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("name", employee.name);
    formData.append("role", employee.role);
    formData.append("image", employee.image);
    formData.append("job", employee.job);
    formData.append("job_id", employee.job_id);
    // TODO: save all the backend port to .env for all components and change all the strings
    alert(`${JSON.stringify(Object.fromEntries(formData))}`)
    axios
      .post("http://localhost:3000/auth/employee", Object.fromEntries(formData))
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          // TODO: refactor all alert error handle based on our global todos
          alert(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        {/* TODO: unhardcode this label-input and delete disturbing "4" if it's possible */}
        {/* TODO: refactor Salary not per category, like in real cases, but by projects done OR by admin input */}
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label for="inputJob" className="form-label">
              Job
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputJob"
              placeholder="Enter Job"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, job: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="department" className="form-label">
              Department
            </label>
            {/* TODO: add department for employee input */}
            <select
              name="department"
              id="department"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
            >
              {department.map((dep) => {
                return <option value={dep.id}>{dep.name}</option>;
              })}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
