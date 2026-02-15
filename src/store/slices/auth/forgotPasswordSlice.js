import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

// 1. أكشن التأكد من وجود الإيميل
export const checkEmailExist = createAsyncThunk(
  "auth/checkEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/check-email", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Email validation failed" },
      );
    }
  },
);

// 2. أكشن طلب إرسال الكود
export const requestResetCode = createAsyncThunk(
  "auth/requestResetCode",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Failed to send code" },
      );
    }
  },
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    isEmailValid: false,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    resetForgotState: (state) => {
      state.isEmailValid = false;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // حالات التأكد من الإيميل
      .addCase(checkEmailExist.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkEmailExist.fulfilled, (state) => {
        state.loading = false;
        state.isEmailValid = true;
        state.error = null;
      })
      .addCase(checkEmailExist.rejected, (state, action) => {
        state.loading = false;
        state.isEmailValid = false;
        state.error = action.payload?.message;
      })
      // حالات إرسال الكود
      .addCase(requestResetCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestResetCode.fulfilled, (state) => {
        state.loading = false;
        state.status = "succeeded";
      })
      .addCase(requestResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { resetForgotState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
