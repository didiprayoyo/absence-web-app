import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    countAdmin();
    countEmployee();
    countSalary();
    AdminRecords();
  }, []);

  const AdminRecords = () => {
    axios.get("http://localhost:3000/auth/admin-records").then((result) => {
      if (result.data.Status) {
        setAdmins(result.data.Result);
      } else {
        // TODO: refactor all alert error handle based on our global todos
        alert(result.data.Error);
      }
    });
  };
  
  const countAdmin = () => {
    axios.get("http://localhost:3000/auth/admin-count").then((result) => {
      if (result.data.Status) {
        setAdminTotal(result.data.Result[0].admin);
      }
    }); // TODO: refactor all alert error handle based on our global todos
  };

  const countEmployee = () => {
    axios.get("http://localhost:3000/auth/employee-count").then((result) => {
      if (result.data.Status) {
        setEmployeeTotal(result.data.Result[0].employee);
      }
    }); // TODO: refactor all alert error handle based on our global todos
  };

  const countSalary = () => {
    axios.get("http://localhost:3000/auth/salary-count").then((result) => {
      if (result.data.Status) {
        // [x]: name of salaryOfEmp
        setSalaryTotal(result.data.Result[0].salarysumofemp);
      } else {
        // TODO: refactor all alert error handle based on our global todos
        alert(result.data.Error);
      }
    });
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>${salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((a, index) => (
              // TODO: using index instead of id, safer
              <tr key={index}>
                <td>{a.email}</td>
                {/* TODO: this actions only for super admin */}
                <td>
                  <button className="btn btn-info btn-sm me-2">Edit</button>
                  <button className="btn btn-warning btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
