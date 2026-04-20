import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../services/axios"

// Fetch Payroll Analytics
export const fetchPayrollSummary = createAsyncThunk(
  "payroll/fetchPayrollSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/payroll/summary-status`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch payroll summary"
      );
    }
  }
);
const getInitialRange = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // الشهر الحالي (0-11)
  
  // أول يوم في الشهر الحالي
  const start = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  
  // آخر يوم في الشهر الحالي (اليوم 0 من الشهر القادم هو آخر يوم في الحالي)
  const lastDay = new Date(year, month + 1, 0).getDate();
  const end = `${year}-${String(month + 1).padStart(2, '0')}-${lastDay}`;
  
  return { start, end };
};

const payrollSlice=createSlice({
    name:"payroll",
    initialState:{
        selectedRange:getInitialRange(),
        analytics:null,
        loading: false,
        error: null,
    },
     reducers: {
        // ضيفي الـ Action ده عشان نقدر نغير التاريخ
        setPayrollRange: (state, action) => {
            state.selectedRange = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPayrollSummary.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchPayrollSummary.fulfilled,(state,action)=>{
            state.loading=false;
            state.analytics=action.payload;
           
        })
        .addCase(fetchPayrollSummary.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

    },

});
export const { setPayrollRange } = payrollSlice.actions;
export default payrollSlice.reducer;