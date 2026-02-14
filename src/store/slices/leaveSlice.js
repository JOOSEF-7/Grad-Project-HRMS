

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/axios';

// ============================================
// 1. جلب كل طلبات الأجازات
// ============================================
export const fetchAllLeaves = createAsyncThunk(
  'leaves/fetchAll', 
  async (_, { rejectWithValue }) => {
    try {
      // ✅ المسار الصحيح: /api/leaves (مش /leaves/leaves)
      const response = await axios.get('/leaves');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch leaves");
    }
  }
);

// ============================================
// 2. البحث في الأجازات
// ============================================
export const searchLeaves = createAsyncThunk(
  'leaves/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/leaves/search?query=${query}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Search failed");
    }
  }
);

// ============================================
// 3. تحديث حالة طلب الأجازة
// ============================================
export const updateLeaveStatus = createAsyncThunk(
  'leaves/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      // ✅ المسار الصحيح: /api/leaves/:id/status
      const response = await axios.patch(`/leaves/${id}/status`, { status });
      return { id, status };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ============================================
// الـ Slice
// ============================================
const leaveSlice = createSlice({
  name: 'leaves',
  initialState: { 
    list: [],
    searchResults: [],
    loading: false,
    searchLoading: false,
    error: null
  },
  reducers: {
    clearLeaveSearch: (state) => {
      state.searchResults = [];
      state.searchLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // جلب كل الأجازات
      .addCase(fetchAllLeaves.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchAllLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // البحث
      .addCase(searchLeaves.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchLeaves.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchLeaves.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })
      // تحديث الحالة
      .addCase(updateLeaveStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        // تحديث في القائمة الرئيسية
        const leave = state.list.find(l => l.id === id);
        if (leave) {
          leave.status = status;
        }
        // تحديث في نتائج البحث أيضاً
        const searchLeave = state.searchResults.find(l => l.id === id);
        if (searchLeave) {
          searchLeave.status = status;
        }
      });
  }
});

export const { clearLeaveSearch } = leaveSlice.actions;
export default leaveSlice.reducer;