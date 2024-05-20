import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwitchEdit from "./SwitchEdit";
import SwitchAdd from "./SwitchAdd";

const Department = () => {
  const [departmentJob, setDepartmentJob] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/department/departments-jobs")
      .then((result) => {
        if (result.data.Status) {
          // console.log(result.data.Result);
          // result.data.Result[0].jobs.map((job, index) => {
          //   console.log(index, job);
          // });
          setDepartmentJob(result.data.Result);
        } else {
          // TODO: refactor to toaster
          console.log(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // TODO: make confirm using toaster + extended modal pop up cards
    axios
      .delete(`http://localhost:3000/department/department/${id}`)
      .then((result) => {
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
        <h3>
          Department List (TODO: change this design & implement to Department &
          Job Roles)
        </h3>
      </div>
      <Link to="/dashboard/add-department" className="btn btn-success">
        Add Department
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
              <th>List of Jobs</th>
            </tr>
          </thead>
          <tbody>
            {departmentJob.map((dep, index) => (
              // TODO: using index instead of id, safer
              <tr key={index}>
                <td>{dep.department}</td>
                <td>
                  <SwitchEdit name="department" object={dep} index={index} />
                  {/* TODO: cascading delete of all jobs in departments */}
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(dep.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {dep.jobs}
                  <ul>
                    {/* TODO: add edit & delete feature for jobs */}
                    {/* {dep.jobs.map((job, index) => {
                      <li key={index}>
                        {job}
                        <SwitchEdit
                          name="job"
                          object={dep.jobs[0]}
                          index={index}
                        />
                      </li>;
                    })} */}
                    <SwitchAdd name="job" id={dep.id} />
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Department;
