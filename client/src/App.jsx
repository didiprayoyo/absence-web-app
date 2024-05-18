import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Employee from "./Components/Employee";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";
import Start from "./Components/Start";
import EmployeeLogin from "./Components/EmployeeLogin";
import EmployeeDetail from "./Components/EmployeeDetail";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/admin-login" element={<Login />}></Route>
        <Route path="/employee-login" element={<EmployeeLogin />}></Route>
        {/* TODO: Handle Private Route for Employee Login */}
        <Route path="/employee-detail/:id" element={<EmployeeDetail />}></Route>
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
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route
            path="/dashboard/add-category"
            element={<AddCategory />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
