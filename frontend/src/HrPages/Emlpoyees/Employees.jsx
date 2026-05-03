import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyAttendance, fetchAttendance } from "../../store/HrSlices/attendance/attendanceSlice";

// components
import EmployeesTable from "../../HrComponents/employees/EmployeesTable/EmployeesTable";
import EmployeeHeader from "../../HrComponents/employees/EmployeeHeader/EmployeeHeader";
import HRApproval from "../../HrComponents/employees/HRApproval/HRApproval";
import AttendanceReport from "../../HrComponents/DashboardComponents/AttendanceReport";

const Employees = () => {
  const dispatch = useDispatch();
  const { chartData, totals, selectedDate, pagination } = useSelector(
    (state) => state.attendance,
  );

  const attendanceReportData = {
    totals,
    chartData,
  };

  // useEffect(() => {
  //   if (selectedDate) {
  //     const dateObj = new Date(selectedDate);
  //     const month = dateObj.getMonth() + 1;
  //     const year = dateObj.getFullYear();

  //     // 1. طلب بيانات الجدول (مع القيم الافتراضية)
  //     dispatch(fetchAttendance({ 
  //       date: selectedDate, 
  //       page: 1, 
  //       limit: 5, 
  //       status: "All" 
  //     }));

  //     // 2. طلب بيانات الشارت
  //     dispatch(fetchMonthlyAttendance({ month, year }));
  //   }
  // }, [selectedDate, dispatch]);
  useEffect(() => {
  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();

    // ✅ شيلي fetchAttendance من هنا — EmployeesTable هتعملها بنفسها
    dispatch(fetchMonthlyAttendance({ month, year }));
  }
}, [selectedDate, dispatch]);

  return (
    <div className="max-w-[1650px] mx-auto p-4 bg-transparent">
      <div className="space-y-3">
        <EmployeeHeader />

        <AttendanceReport
          title="Performance report"
          desc="Real-time employee attendance report"
          data={attendanceReportData}
          filter="Monthly"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            {/* 🛡️ شلنا الـ Props لأن الجدول هيسحب بياناته بنفسه من الـ Redux */}
            <EmployeesTable /> 
          </div>

          <div className="space-y-6">
            <HRApproval />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
