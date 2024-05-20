import React from "react";
import { Navigate } from "react-router-dom";

const InSessionRoute = ({ children }) => {
    console.log(localStorage.getItem("role") !== "");
  // TODO: try to save token only
  return localStorage.getItem("role") !== "" ? children : <Navigate to="/" />;
};

export default InSessionRoute;
