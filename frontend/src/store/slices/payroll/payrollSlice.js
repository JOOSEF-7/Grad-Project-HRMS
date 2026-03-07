import { createSlice } from "@reduxjs/toolkit";

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
        selectedRange:getInitialRange()
    },
     reducers: {
        // ضيفي الـ Action ده عشان نقدر نغير التاريخ
        setPayrollRange: (state, action) => {
            state.selectedRange = action.payload;
        }
    }

});
export const { setPayrollRange } = payrollSlice.actions;
export default payrollSlice.reducer;