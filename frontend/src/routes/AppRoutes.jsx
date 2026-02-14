import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/auth/Login/Login";
import Register from "../pages/auth/Register/Register";
import Error from "../pages/error/Error";
import Home from "../pages/Home/Home";
import Employees from "../pages/Emlpoyees/Employees";
import Project from "../pages/Project/Project";
import Payroll from "../pages/Payroll/Payroll";
import Hiring from "../pages/Hiring/Hiring";
import Attendance from "../pages/Attendance/Attendance";
import Leave from "../pages/Leave/Leave";
import Performance from "../pages/Performance/Performance";
import DepartmentList from "../components/department/DepartmentList";
import AddDepartment from "../components/department/AddDepartment";



export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "emlpoyees",
        element: <Employees />
      },
      {
        path: "project",
        element: <Project />
      },
      {
        path: "Payroll",
        element: <Payroll />
      },
      {
        path: "hiring",
        element: <Hiring />
      },
      {
        path: "attendance",
        element: <Attendance />
      },
      {
        path: "leave",
        element: <Leave />
      },
      {
        path: "add-department",
        element: <AddDepartment />
      },
    
      {
        path: "performance",
        element: <Performance/>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);
