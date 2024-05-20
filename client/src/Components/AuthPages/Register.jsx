import React, { useState, useEffect } from "react";
import "../style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin", // FIXME: testing only
  });
  const [error, setError] = useState(null);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:3000/auth/signup", values)
      .then((result) => {
        console.log(result);
        if (result.data.Status) {
          navigate("/login", {
            state: {
              registeredDescription: "You have been registered as Admin",
            },
          });
        } else {
          setError(result.data.Error);
        }
      }) // TODO: refactor frontend error logs
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        {/* FIXME: it is safe to use error && error */}
        <div className="text-warning">{error && error}</div>
        <h2>Register Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name:</strong>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={(e) => setValues({ ...values, name: e.target.value })}
              className="form-control rounded-0"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 mb-2"
          >
            Register
          </button>
          {/* TODO: it's just decoration, delete if it's not used */}
          <div className="mb-1">
            <input
              type="checkbox"
              name="agreement"
              id="tick"
              className="me-2"
            />
            <label htmlFor="password">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
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
  );
};

export default EmployeeLogin;
