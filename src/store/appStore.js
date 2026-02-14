import { configureStore } from "@reduxjs/toolkit";

// ============================================
// استيراد كل الـ Reducers
// ============================================
// Auth
import authReducer from "./slices/loginAuth/loginAuthSlice";

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

// ============================================
// إنشاء الـ Store
// ============================================
export const store = configureStore({
  reducer: {
    // Authentication
    auth: authReducer,

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
  
  // Middleware Configuration (اختياري)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // تجاهل بعض الأكشنز إذا كانت تحتوي على قيم non-serializable
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;