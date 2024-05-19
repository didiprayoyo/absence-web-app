import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Department = () => {
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/department/all-departments")
      .then((result) => {
        if (result.data.Status) {
          setDepartment(result.data.Result);
          // alert(`${JSON.stringify(result.data.Result)} ${department}`)
        } else {
          // TODO: refactor to toaster
          alert(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Department List (TODO: change this design & implement to Department & Job Roles)</h3>
      </div>
      <Link to="/dashboard/add-department" className="btn btn-success">
        Add Department
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {department.map((dep, index) => (
              // TODO: using index instead of id, safer
              <tr key={index}>
                <td>{dep.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Department;
