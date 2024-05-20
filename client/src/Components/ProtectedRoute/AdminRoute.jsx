import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    console.log(localStorage.getItem("role"));
    if (localStorage.getItem("role") == "admin" ||
    localStorage.getItem("role") == "superadmin") console.log("HAHAHA");
  // TODO: try to save token only
  return (localStorage.getItem("role") == "admin" ||
    localStorage.getItem("role") == "superadmin") ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
