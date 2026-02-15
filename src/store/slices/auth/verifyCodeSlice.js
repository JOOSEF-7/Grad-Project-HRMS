import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

//  التحقق من الكود
export const verifyOtpCode = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/verify-code", { email, code });

      // حفظ البيانات فور النجاح لأن verify-code في الباك  بيرجع توكن ويوزر
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Verification failed" },
      );
    }
  },
);

// (بيكلم نفس اند بوينت الفورجيت)
export const resendCode = createAsyncThunk(
  "verify/resend",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/forgot-password", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to resend code",
      );
    }
  },
);

const verifyCodeSlice = createSlice({
  name: "verifyCode",
  initialState: {
    isVerified: false,
    loading: false,
    error: null,
    timer: 32,
  },
  reducers: {
    resetVerifyState: (state) => {
      state.isVerified = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtpCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpCode.fulfilled, (state) => {
        state.loading = false;
        state.isVerified = true;
      })
      .addCase(verifyOtpCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetVerifyState } = verifyCodeSlice.actions;
export default verifyCodeSlice.reducer;
