import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeSummary} from "../../store/slices/employeeSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//components
import { ArrowLeft } from 'lucide-react'
import EmployeeProfileCard from "../../components/employees/EmployeeDetail/cards/EmployeeProfileCard";
import LeaveStatCard from "../../components/employees/EmployeeDetail/cards/LeaveStatCard";
import AttendanceHistoryCard from "../../components/employees/EmployeeDetail/cards/AttendanceHistoryCard";
import TimeWorkedCard from "../../components/employees/EmployeeDetail/cards/TimeWorkedCard";
import ProjectCompletionCard from "../../components/employees/EmployeeDetail/cards/ProjectProgressItem";

const EmployeeDetail = () => {
  
  const navigate=useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { employeeDetail, loading, error } = useSelector(
    (state) => state.employees
  );


  useEffect(() => {
    dispatch(fetchEmployeeSummary(id));
    console.log(employeeDetail)
    
  
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 
  

  return (
    <div className="min-h-screen bg-slate-900">
      

      <main className="px-4 md:px-6 py-6">
        {/* Page title */}
        <div className="flex items-center gap-3 mb-6">
          <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors" onClick={()=>{navigate(-1)}}>
            <ArrowLeft  size={20} className="text-slate-400" />
          </button>
          <h1 className="text-white text-xl font-semibold">Employee detail</h1>
        </div>
         {/* Top section: Profile + Leave stats */}
        <div className="text-white grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
          <div className="lg:col-span-6 ">
            <EmployeeProfileCard employee={employeeDetail}/>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <LeaveStatCard
               title="Total leave"
               value={employeeDetail?.leaveBalance?.totalLeave}
               description="The total number of leave days allocated for the year."
            />
            <LeaveStatCard
              title="Leave taken"
              value={employeeDetail?.leaveBalance?.leaveTaken}
              description="The number of leave days you have used so far."
            />
            <LeaveStatCard
              title="Remaining Leave"
              value={employeeDetail?.leaveBalance?.remainingLeave}
              description="The number of leave days still available for use."
            />
          </div>
        </div>
          {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left column - Attendance History */}
          <div className="lg:col-span-8">
            <AttendanceHistoryCard/> 
          </div>

          {/* Right column - Stats cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <TimeWorkedCard timeWorked={employeeDetail?.totalTimeWorked}/>
            <ProjectCompletionCard projects={employeeDetail?.projects}/>
            TasksContainer 
          </div>
        </div>
        
      </main>
    </div>
       
    
  );
};

export default EmployeeDetail;
