import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [summaryInfos, setSummaryInfos] = useState({
    countAdmin: 0,
    adminList: [],
    countEmployee: 0,
    countDepartment: 0,
  });

  useEffect(() => {
    getSummaryInfos();
  }, []);

  const getSummaryInfos = () => {
    axios.get("http://localhost:3000/user/admin-dashboard").then((result) => {
      if (result.data.Status) {
        setSummaryInfos(result.data.Result);
      } else {
        // TODO: refactor all alert error handle based on our global todos
        alert(result.data.Error);
      }
    });
  }

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
            <h5>{summaryInfos.countAdmin}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{summaryInfos.countEmployee}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Department</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>${summaryInfos.countDepartment}</h5>
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
            {adminList.map((admin, index) => (
              // TODO: using index instead of id, safer
              <tr key={index}>
                <td>{admin.email}</td>
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
