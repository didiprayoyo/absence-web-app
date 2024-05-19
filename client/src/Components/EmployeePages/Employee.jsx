import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  // TODO: not used, delete if it's safe
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/all-employees")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
          // alert(`${JSON.stringify(result.data.Result)}`)
        } else {
          alert(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // TODO: make confirm using toaster + extended modal pop up cards
    axios.delete(`http://localhost:3000/user/${id}`).then((result) => {
      if (result.data.Status) {
        window.location.reload();
      } else {
        // TODO: refactor all alert error handle based on our global todos
        alert(result.data.Error);
      }
    }); // FIXME: is it okay without catch?
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add-employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              {/* TODO: joining department to job_role, then to users */}
              {/* <th>Department</th>
              <th>Job Role</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((e, index) => (
              <tr key={index}>
                {/* FIXME: this index must be using employee index, admin have authority to access all employee */}
                <td>{e.name}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Images/` + e.image}
                    // TODO: handle alt by describe "picture of <username>"
                    className="employee_image"
                  />
                </td>
                <td>{e.email}</td>
                {/* <td>{e.department}</td>
                <td>{e.job_role}</td> */}
                <td>
                  <Link
                    to={`/dashboard/edit-employee/${e.id}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
