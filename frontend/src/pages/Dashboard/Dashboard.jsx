import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardAnalytics } from "../../store/slices/mainDashboard/dashboardSlice";

//  components
import DashboardHeader from "../../components/DashboardComponents/DashboardHeader";
import StatsCards from "../../components/DashboardComponents/StatsCards";
import AttendanceReport from "../../components/DashboardComponents/AttendanceReport";
import EmployeeStatus from "../../components/DashboardComponents/EmployeeStatus";
import JobApplicants from "../../components/DashboardComponents/JobApplicants";
import TaskSummary from "../../components/DashboardComponents/TaskSummary";

const Dashboard = () => {
  const dispatch = useDispatch();
  const dashboardRef = useRef(null);

  const { selectedDate, analytics, loading, error } = useSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(fetchDashboardAnalytics(selectedDate));
  }, [selectedDate, dispatch]);

  // حالات التحميل والأخطاء
  if (loading && !analytics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
          <p className="text-gray-400 font-semibold tracking-wide">
            Loading Dashboard Analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <p className="text-red-400 font-semibold mb-2">
            Failed to load dashboard
          </p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button
            onClick={() => dispatch(fetchDashboardAnalytics(selectedDate))}
            className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <i className="fas fa-redo mr-2"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dashboardRef}
      className="max-w-[1650px] mx-auto p-4 bg-transparent"
    >
      <DashboardHeader printRef={dashboardRef} />

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <StatsCards stats={analytics?.stats} />

          <AttendanceReport
            title={"Attendance report"}
            desc={"Real-time employee attendance report"}
            data={analytics?.attendanceReport}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <EmployeeStatus data={analytics?.employeeStatus} />
            <JobApplicants applicants={analytics?.recentApplicants} />
          </div>
        </div>

        {/* (Task Summary)*/}
        <div className="col-span-12 lg:col-span-4">
          <TaskSummary data={analytics?.taskSummary} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
