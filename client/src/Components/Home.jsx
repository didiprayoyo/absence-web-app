import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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

  const getSummaryInfos = () => {
    axios.get("http://localhost:3000/user/admin-dashboard").then((result) => {
      console.log(result.data);
      if (result.data.Status) {
        setSummaryInfos(result.data.Result);
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
            <h5>{summaryInfos.countDepartment}</h5>
          </div>
        </div>
      </div>
      {localStorage.getItem("role") == "superadmin" && (
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
              {summaryInfos.adminList.map((admin, index) => (
                // TODO: using index instead of id, safer
                <tr key={index}>
                  <td>{admin.email}</td>
                  {/* TODO: this actions only for super admin */}
                  <td>
                    <Link
                      to={`/dashboard/edit-employee/${admin.id}`}
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
