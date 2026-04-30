import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMonthlyAttendance } from "../../store/HrSlices/attendance/attendanceSlice";
import { fetchAttendance } from "../../store/HrSlices/attendance/attendanceSlice";

//  components
import EmployeesTable from "../../components/employees/EmployeesTable/EmployeesTable";
import EmployeeHeader from "../../components/employees/EmployeeHeader/EmployeeHeader";
import HRApproval from "../../components/employees/HRApproval/HRApproval";
import AttendanceReport from "../../HrComponents/DashboardComponents/AttendanceReport";

const Employees = () => {
  const dispatch = useDispatch();
  const { attendanceList, loading, error, chartData, totals } = useSelector(
    (state) => state.attendance,
  );

  const attendanceReportData = {
    stats: totals,
    chartData: chartData,
  };
  const selectedDate = useSelector((state) => state.attendance.selectedDate);
  useEffect(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      dispatch(fetchAttendance(selectedDate));
      dispatch(fetchMonthlyAttendance({ month, year }));
    }
  }, [selectedDate, dispatch]);

  // حالات التحميل والأخطاء
  // if (loading ) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <div className="text-center">
  //         <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
  //         <p className="text-gray-400 font-semibold tracking-wide">
  //           Loading Dashboard Analytics...
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[60vh]">
  //       <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
  //         <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
  //         <p className="text-red-400 font-semibold mb-2">
  //           Failed to load dashboard
  //         </p>
  //         <p className="text-gray-500 text-sm">{error}</p>
  //         <button
  //           onClick={() => dispatch(fetchAttendance(selectedDate))}
  //           className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
  //         >
  //           <i className="fas fa-redo mr-2"></i>
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-[1650px] mx-auto p-4 bg-transparent">
      <div className=" space-y-3">
        {/* Header */}
        <EmployeeHeader />

        {/* Top Section */}
        <div>
          <AttendanceReport
            title={"Performance report"}
            desc={"Real-time employee attendance report"}
            data={attendanceReportData}
            filter={"Monthly"}
          />
        </div>

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
