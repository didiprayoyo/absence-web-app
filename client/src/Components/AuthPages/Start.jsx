import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/verify")
      .then((result) => {
        console.log(result.data);
        if (result.data.Status) {
          localStorage.setItem("role", result.data.role);
          if (result.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate(`/employee-detail/${result.data.id}`);
          }
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Register or Login</h2>
        <div className="d-flex justify-content-between mt-5 mb-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
