import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./slices/auth/loginSlice";
import forgotPasswordReducer from "./slices/auth/forgotPasswordSlice";
import verifyCodeReducer from "./slices/auth/verifyCodeSlice";

// Navbar
import notificationReducer from "./slices/navbar/notificationSlice";
import uiReducer from "./slices/navbar/sideMenuSlice";
import searchReducer from "./slices/navbar/searchSlice";
import hrProfileReducer from "./slices/navbar/hrProfileSlice";

// Dashboard
import dashboardReducer from "./slices/mainDashboard/dashboardSlice";

// Features
import employeeReducer from "./slices/employeeSlice";
import projectReducer from "./slices/projectSlice";
import hiringReducer from "./slices/hiringSlice";
import leaveReducer from "./slices/leaveSlice";

export const store = configureStore({
  reducer: {
    // Authentication
    auth: loginReducer,
    forgotPassword: forgotPasswordReducer,
    verifyCode: verifyCodeReducer,

    // Navbar Features
    ui: uiReducer,
    search: searchReducer,
    notifications: notificationReducer,
    hrProfile: hrProfileReducer,

    // Dashboard
    dashboard: dashboardReducer,

    // Main Features
    employees: employeeReducer,
    projects: projectReducer,
    leaves: leaveReducer,
    hiring: hiringReducer,
  },
});

export default store;
