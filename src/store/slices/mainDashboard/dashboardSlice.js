import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

// جلب تحليلات الداشبورد
export const fetchDashboardAnalytics = createAsyncThunk(
  "dashboard/fetchAnalytics",
  async (date, { rejectWithValue }) => {
    try {
      // ✅ المسار الصحيح: /api/dashboard/analytics
      const response = await axios.get(`/dashboard/analytics?date=${date}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to sync dashboard data",
      );
    }
  },
);

// الـ Slice
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    selectedDate: new Date().toISOString().split("T")[0],
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    resetToToday: (state) => {
      state.selectedDate = new Date().toISOString().split("T")[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchDashboardAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedDate, resetToToday } = dashboardSlice.actions;
export default dashboardSlice.reducer;
