import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axios";

// 1. البحث في الموظفين
export const searchEmployees = createAsyncThunk(
  "employees/search",
  async (query, { rejectWithValue }) => {
    try {
      // ✅ المسار الصحيح: /api/employees/search
      const response = await axios.get(`/employees/search?query=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  },
);

// 2. جلب تفاصيل موظف معين
export const fetchEmployeeSummary = createAsyncThunk(
  "employees/fetchSummary",
  async (id, { rejectWithValue }) => {
    try {
      // ✅ المسار الصحيح: /api/employees/:id
      const response = await axios.get(`/employees/${id}/summary`);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch employee",
      );
    }
  },
);
// 3. تعديل تفاصيل موظف معين
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/employees/${id}`,
        updatedData
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update employee"
      );
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    searchResults: [],
    employeeDetail: null,
    selectedEmployee: null,
    loading: false,
    searchLoading: false,
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.searchLoading = false;
      state.error = null;
    },
    resetEmployeeDetail: (state) => {
      state.employeeDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // البحث
      .addCase(searchEmployees.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchEmployees.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchEmployees.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
        state.searchResults = [];
      })
      // جلب التفاصيل
      .addCase(fetchEmployeeSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeSummary.fulfilled, (state, action) => {
        
        state.loading = false;
        state.employeeDetail = action.payload;
      })
      .addCase(fetchEmployeeSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // لما التحديث ينجح
      .addCase(updateEmployee.fulfilled, (state, action) => {
      state.loading = false;

      if (state.employeeDetail?.id === action.payload.id) {
      state.employeeDetail = action.payload; }

      const index = state.searchResults.findIndex(
       emp => emp.id === action.payload.id
      );

      if (index !== -1) {
    state.searchResults[index] = action.payload;
     }
     })

    // أثناء التحميل
    .addCase(updateEmployee.pending, (state) => {
      state.loading = true;
    })

    // لو فشل
    .addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearSearch, resetEmployeeDetail } = employeeSlice.actions;
export default employeeSlice.reducer;
