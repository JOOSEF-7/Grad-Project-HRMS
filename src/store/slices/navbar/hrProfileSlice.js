import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios";

// جلب بروفايل الـ HR الحالي
export const fetchMyHRProfile = createAsyncThunk(
  "hrProfile/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/hr-profile/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch HR profile",
      );
    }
  },
);

const hrProfileSlice = createSlice({
  name: "hrProfile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearHRProfile: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyHRProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyHRProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMyHRProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHRProfile } = hrProfileSlice.actions;
export default hrProfileSlice.reducer;
