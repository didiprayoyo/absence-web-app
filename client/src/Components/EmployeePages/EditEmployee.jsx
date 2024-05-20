import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    email: "",
    name: "",
    job_id: 0,
  });
  const [job, setJob] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/department/all-jobs")
      .then((result) => {
        if (result.data.Status) {
          setJob(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3000/user/${id}`)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result.name,
          email: result.data.Result.email,
          job_id: result.data.Result.job_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/user/${id}`, employee)
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          navigate(-1);
          // navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              defaultValue={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              defaultValue={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="job" className="form-label">
              Job Role
            </label>
            <select
              name="job"
              id="job"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, job_id: e.target.value })
              }
            >
              {job.map((j) => {
                return (
                  <option value={j.id} selected={j.id === employee.job_id}>
                    {j.job}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
