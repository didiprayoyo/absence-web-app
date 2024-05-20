import React, { useState } from "react";
import "../style.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/auth/login-email", values)
      .then((result) => {
        if (result.data.Status) {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
          // TODO: handle navigate login as employee
          // navigate(`/employee-detail/${result.data.id}`);
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
        <div className="text">{state && state.registeredDescription}</div>
        <div className="text-warning">{error && error}</div>
        <h2>Login Page</h2>
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
          <button type="submit" className="btn btn-success w-100 rounded-0 mb-2">
            Log in
          </button>
          <div className="mb-1">
            <input type="checkbox" name="agreement" id="tick" className="me-2" />
            {/* TODO: it's just decoration, delete if it's not used */}
            <label htmlFor="password">
              You are Agree with terms & conditions
            </label>
          </div>
        </form>
        <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
      </div>
    </div>
  );
};

export default Login;
