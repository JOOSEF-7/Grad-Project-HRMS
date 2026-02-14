import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

/**
 * 1. الأكشن الخاص بتسجيل الدخول
 * يرسل (email, password) للباك إيند على مسار /api/auth/login
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);

      // حفظ البيانات في المتصفح لضمان عدم الخروج عند عمل Refresh
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (err) {
      // إرجاع رسالة الخطأ القادمة من السيرفر
      return rejectWithValue(
        err.response?.data || { message: "Internal Server Error" },
      );
    }
  },
);


/**
 * 2. السلايس الخاص بالأمان (Authentication)
 */
const loginAuthSlice = createSlice({
  name: "auth",
  initialState: {
    // قراءة البيانات المحفوظة من الـ localStorage عند تشغيل التطبيق أول مرة
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    /**
     * وظيفة تسجيل الخروج ومسح كل البيانات
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // حالة انتظار الرد من السيرفر
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // تصغير الأخطاء السابقة عند محاولة جديدة
      })
      // حالة نجاح تسجيل الدخول
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      // حالة فشل تسجيل الدخول (بيانات غلط أو سيرفر واقع)
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

// تصدير الأكشنز والـ Reducer
export const { logout } = loginAuthSlice.actions;
export default loginAuthSlice.reducer;
