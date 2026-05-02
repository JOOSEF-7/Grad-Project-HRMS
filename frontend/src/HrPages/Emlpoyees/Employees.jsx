import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyAttendance } from "../../store/HrSlices/attendance/attendanceSlice";
import { fetchAttendance } from "../../store/HrSlices/attendance/attendanceSlice";

//  components
import EmployeesTable from "../../HrComponents/employees/EmployeesTable/EmployeesTable";
import EmployeeHeader from "../../HrComponents/employees/EmployeeHeader/EmployeeHeader";
import HRApproval from "../../HrComponents/employees/HRApproval/HRApproval";
import AttendanceReport from "../../HrComponents/DashboardComponents/AttendanceReport";

const Employees = () => {
  const dispatch = useDispatch();
  const { attendanceList, loading, error, chartData, totals, selectedDate } = useSelector(
    (state) => state.attendance,
  );

  // تأكدي إن المسميات هنا هي totals و chartData
  const attendanceReportData = {
    totals,      // دي اللي بتعرض الأرقام الكبيرة على الشمال
    chartData,   // دي اللي بترسم العواميد
  };

  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const month = dateObj.getMonth() + 1; // 1-12
      const year = dateObj.getFullYear();
      
      dispatch(fetchAttendance(selectedDate)); // للجدول (Daily)
      dispatch(fetchMonthlyAttendance({ month, year })); // للشارت (6 Months)
    }
  }, [selectedDate, dispatch]);

  return (
    <div className="max-w-[1650px] mx-auto p-4 bg-transparent">
      <div className=" space-y-3">
        <EmployeeHeader />

        <AttendanceReport
          title="Performance report"
          desc="Real-time employee attendance report"
          data={attendanceReportData} // الداتا دلوقتي جاهزة
          filter="Monthly"
        />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Table */}
          <div className="lg:col-span-2">
            <EmployeesTable attendanceList={attendanceList} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <HRApproval />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
