import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

// Fetch Daily Attendance
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/attendance?date=${date}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch attendance"
      );
    }
  }
);
// Fetch Monthly Attendance Analytics
export const fetchMonthlyAttendance = createAsyncThunk(
  "attendance/fetchMonthlyAttendance",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/attendance/monthly?month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch monthly attendance"
      );
    }
  }
);

const initialState = {
  attendanceList: [],
  chartData: [],
  totals: {
      onTime: 0,
      late: 0,
      absent: 0,
    },
  selectedMonth: new Date().toISOString().slice(0, 7), 
  selectedDate: new Date().toISOString().split("T")[0],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
    state.selectedMonth = action.payload;
    },
    setSelectedDate: (state, action) => {
    state.selectedDate = action.payload;
    },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceList = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonthlyAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData = action.payload.chartData;
        state.totals = action.payload.totals;
      })
      .addCase(fetchMonthlyAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setSelectedMonth,setSelectedDate } = attendanceSlice.actions;
export default attendanceSlice.reducer;