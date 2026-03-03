import { createBrowserRouter, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

// Auth Pages
import Login from "../pages/auth/Login/Login";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/auth/VerifyCode/VerifyCode";
import Splash from "../pages/Splash/Splash";
import Error from "../pages/Error/Error";

// Dashboard Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Employees from "../pages/Emlpoyees/Employees";
import EmployeeDetail from "../pages/EmployeeDetail/EmployeeDetail";
import Project from "../pages/Project/Project";
import Payroll from "../pages/Payroll/Payroll";
import Hiring from "../pages/Hiring/Hiring";
import Attendance from "../pages/Attendance/Attendance";
import Leave from "../pages/Leave/Leave";
import Performance from "../pages/Performance/Performance";
// import Settings from "../pages/sett/Settings";
import Sett from "../pages/sett/Sett";

export const router = createBrowserRouter(
  [
    // Public Routes (غير محمية)
    {
      path: "/",
      element: <Splash />,
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/verify",
      element: <VerifyCode />,
    },
    {
      path: "/job",
      element: (
        <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
          <div className="text-center">
            <i className="fas fa-briefcase text-6xl text-blue-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-white mb-2">
              Job Application
            </h2>
            <p className="text-gray-400">Coming Soon...</p>
          </div>
        </div>
      ),
    },

    // Protected Routes (محمية بـ Authentication)
    {
      element: <ProtectedLayout />,
      children: [
        // Dashboard Layout Routes (مع Sidebar و Navbar)
        {
          element: <MainLayout />,
          children: [
            {
              path: "/",
              element: <Navigate to="/dashboard" replace />,
            },
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
            {
              path: "/employees",
              element: <Employees />,
            },
            {
              path: "/project",
              element: <Project />,
            },
            {
              path: "/payroll",
              element: <Payroll />,
            },
            {
              path: "/hiring",
              element: <Hiring />,
            },
            {
              path: "/attendance",
              element: <Attendance />,
            },
            {
              path: "/leave",
              element: <Leave />,
            },
            {
              path: "/performance",
              element: <Performance />,
            },
          ],
        },

        // Full Screen Protected Pages (without Sidebar)
        {
          path: "/employee/:id",
          element: <EmployeeDetail />,
        },
        {
          path: "/profile",
          element: <EmployeeDetail />,
        },
        {
          path: "/sett",
          element: <Sett />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

