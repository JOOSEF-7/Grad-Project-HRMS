import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeSummary } from "../../store/HrSlices/employeeSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EmployeeProfileCard from "../../HrComponents/employees/EmployeeDetail/cards/EmployeeProfileCard";
import AttendanceHistoryCard from "../../HrComponents/employees/EmployeeDetail/cards/AttendanceHistoryCard";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const { employeeDetail, loading } = useSelector((state) => state.employees);

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeSummary(id));
    }
  }, [id, dispatch]);

  return (
    <div className="min-h-screen">
      <main className="px-4 md:px-6 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} className="text-slate-400" />
          </button>
          <h1 className="text-white text-xl font-semibold">Employee Detail</h1>
          {loading && (
            <span className="text-xs text-cyan-400 ml-4 animate-pulse">
              Loading data...
            </span>
          )}
        </div>

        <div className="mb-4">
          <EmployeeProfileCard employee={employeeDetail} />
        </div>

        <div className="mt-4">
          <AttendanceHistoryCard employeeId={id} />
        </div>
      </main>
    </div>
  );
};

export default EmployeeDetail;