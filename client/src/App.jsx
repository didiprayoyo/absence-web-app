import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Start from "./Components/AuthPages/Start";
import Register from "./Components/AuthPages/Register";
import Login from "./Components/AuthPages/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/EmployeePages/Employee";
import Department from "./Components/DepartmentPages/Department";
import Profile from "./Components/Profile";
import AddDepartment from "./Components/DepartmentPages/AddDepartment";
import AddEmployee from "./Components/EmployeePages/AddEmployee";
import EditEmployee from "./Components/EmployeePages/EditEmployee";
import EmployeeDetail from "./Components/EmployeePages/EmployeeDetail";
import PrivateRoute from "./Components/ProtectedRoute/PrivateRoute";
import InSessionRoute from "./Components/ProtectedRoute/InSessionRoute";
import AdminRoute from "./Components/ProtectedRoute/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        {/* TODO: Handle Private Route for Employee Login */}
        <Route path="/employee-detail" element={<InSessionRoute />}>
          <Route
            path="/employee-detail/:id"
            element={<EmployeeDetail />}
          ></Route>
        </Route>

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        >
          <Route path="/dashboard" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/department" element={<Department />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit-employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route>

        {/* <Route path="/employee-detail/:id" element={<EmployeeDetail />}></Route>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Home />}></Route>
          <Route path="/dashboard/employee" element={<Employee />}></Route>
          <Route path="/dashboard/department" element={<Department />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>
          <Route
            path="/dashboard/edit-employee/:id"
            element={<EditEmployee />}
          ></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
