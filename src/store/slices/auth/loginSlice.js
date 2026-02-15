import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

//  تسجيل الدخول
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Internal Server Error" },
      );
    }
  },
);

export const checkEmailStatus = createAsyncThunk(
  "auth/checkEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/check-email", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Email not found");
    }
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearLoginError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(checkEmailStatus.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(checkEmailStatus.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(checkEmailStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearLoginError } = loginSlice.actions;
export default loginSlice.reducer;

