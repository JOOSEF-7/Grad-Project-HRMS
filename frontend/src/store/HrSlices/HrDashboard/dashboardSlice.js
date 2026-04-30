import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";


export const fetchDashboardAnalytics = createAsyncThunk(
  "dashboard/fetchAnalytics",
  async (dateString, { rejectWithValue }) => {
    try {
      // 1. تحويل نص التاريخ (2026-04-14) لشهر وسنة
      const date = new Date(dateString);
      const month = date.getMonth() + 1; // الشهور بتبدأ من 0
      const year = date.getFullYear();
      
      const day = date.getDate(); // 💡 هنحتاجه للـ weekly API



const [summaryRes, attendanceRes] = await Promise.all([
  axios.get(`/dashboard/summary?month=${month}&year=${year}`),
  axios.get(`/dashboard/stats/weekly?day=${day}&month=${month}&year=${year}`)
]);

return {
  ...summaryRes.data.data,
  attendanceReport: attendanceRes.data.data,
};

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load stats");
    }
  }
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






// جلب تحليلات الداشبورد
// export const fetchDashboardAnalytics = createAsyncThunk(
//   "dashboard/fetchAnalytics",
//   async (date, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/dashboard/analytics?date=${date}`);
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to sync dashboard data",
//       );
//     }
//   },
// );
