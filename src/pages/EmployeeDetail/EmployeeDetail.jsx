import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import defaultAvatar from "../../assets/avatars/avatar-default-symbolic-svgrepo-com.svg";
// استيراد الأكشنز من السلايسين
import {
  fetchEmployeeById,
  resetEmployeeDetail,
} from "../../store/slices/employeeSlice";

import {
  fetchMyHRProfile,
  clearHRProfile,
} from "../../store/slices/navbar/hrProfileSlice";

const EmployeeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // معرفة هل نحن في صفحة البروفايل الشخصي أم صفحة موظف عادي
  const isProfilePage = location.pathname.includes("profile");

  // 1. سحب البيانات من سلايس الموظفين (شغل زميلك)
  const {
    employeeDetail,
    loading: empLoading,
    error: empError,
  } = useSelector((state) => state.employees);

  // 2. سحب البيانات من سلايس الـ HR (شغلك إنتي)
  const {
    data: hrData,
    loading: hrLoading,
    error: hrError,
  } = useSelector((state) => state.hrProfile);

  // توحيد الداتا بناءً على الصفحة الحالية
  const emp = isProfilePage ? hrData : employeeDetail;
  const isLoading = isProfilePage ? hrLoading : empLoading;
  const isError = isProfilePage ? hrError : empError;

  useEffect(() => {
    if (isProfilePage) {
      dispatch(fetchMyHRProfile()); // نداء السيرفر الخاص بيكي
    } else if (id) {
      dispatch(fetchEmployeeById(id)); // نداء السيرفر الخاص بزميلك
    }

    // تنظيف كل البيانات عند مغادرة الصفحة لضمان عدم حدوث تداخل
    return () => {
      dispatch(resetEmployeeDetail());
      dispatch(clearHRProfile());
    };
  }, [id, isProfilePage, dispatch]);

  // 1. حالة التحميل
  if (isLoading)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 animate-pulse font-medium tracking-widest uppercase text-xs">
          Fetching details...
        </p>
      </div>
    );

  // 2. حالة الخطأ
  if (isError)
    return (
      <div className="p-10 text-center">
        <div className="text-red-500 mb-4 text-5xl">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="text-gray-300 text-lg">{isError}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-500 underline"
        >
          Go Back
        </button>
      </div>
    );

  // 3. لو الداتا لسه ما وصلتش
  if (!emp)
    return (
      <div className="p-20 text-center text-gray-500 italic">
        No details available for this record.
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[1600px] mx-auto space-y-8"
    >
      {/* الـ Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-[#142129] rounded-xl flex items-center justify-center text-gray-400 hover:text-white border border-gray-800 transition-all"
        >
          <i className="fas fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {isProfilePage ? "My Profile" : "Employee detail"}
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* 1. بطاقة التعريف الأساسية */}
        <div className="col-span-12 lg:col-span-8 bg-[#142129] rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center md:items-start border border-gray-800/40 shadow-xl relative">
          <div className="relative">
            {/* <img src={emp.avatar || emp.image} className="w-36 h-36 rounded-[2rem] object-cover border-4 border-[#0b141a] shadow-2xl" alt={emp.name} /> */}
            <img
              //
              src={
                emp.avatar && emp.avatar.trim() !== ""
                  ? emp.avatar
                  : emp.image && emp.image.trim() !== ""
                    ? emp.image
                    : defaultAvatar
              }
              className="w-36 h-36 rounded-[2rem] object-cover border-4 border-[#0b141a] shadow-2xl"
              alt={emp.name}
            />
            {isProfilePage && (
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-[#142129] text-white">
                <i className="fas fa-camera text-xs"></i>
              </button>
            )}
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-1">{emp.name}</h2>
            <p className="text-blue-400 mb-6 text-sm font-medium uppercase tracking-widest">
              {emp.position}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <InfoItem label="Role" value={emp.role} />
              <InfoItem label="Department" value={emp.department} />
              <InfoItem
                label="Joining Date"
                value={emp.joiningDate || emp.joined}
              />
              <InfoItem label="Email" value={emp.email} />
              <InfoItem label="Phone" value={emp.phone} />
              <InfoItem label="Gender" value={emp.gender} />
            </div>
          </div>
        </div>

        {/* 2. إحصائيات الإجازات */}
        <div className="col-span-12 lg:col-span-4 grid grid-cols-1 gap-4">
          <StatCard
            title="Total leave"
            value={emp.totalLeave}
            color="blue"
            description="allocated for the year."
          />
          <StatCard
            title="Leave taken"
            value={emp.leaveTaken || 0}
            color="gray"
            description="days used so far."
          />
          <StatCard
            title="Remaining Leave"
            value={emp.totalLeave - (emp.leaveTaken || 0)}
            color="gray"
            description="days still available."
          />
        </div>

        {/* 3. جدول تاريخ الحضور */}
        <div className="col-span-12 lg:col-span-8 bg-[#142129] rounded-[2.5rem] p-8 border border-gray-800/40 shadow-xl overflow-hidden">
          <h3 className="text-xl font-bold text-gray-200 mb-8">
            Attendant history
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-[10px] uppercase border-b border-gray-800">
                  <th className="pb-5 font-bold">Date</th>
                  <th className="pb-5 font-bold text-center">Status</th>
                  <th className="pb-5 text-right font-bold pr-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {emp.attendanceHistory?.map((row, i) => (
                  <tr
                    key={row.date || i}
                    className="border-b border-gray-800/30 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-5 text-gray-300 font-medium">
                      {row.date}
                    </td>
                    <td className="py-5 text-center">
                      <span className="bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                        {row.status}
                      </span>
                    </td>
                    <td className="py-5 text-right pr-2 text-gray-600">
                      <i className="fas fa-pencil-alt text-xs cursor-pointer hover:text-white"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. الجزء الجانبي (Work Time & Projects) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#142129] rounded-[2.5rem] p-8 border border-gray-800/40 shadow-xl">
            <h3 className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-6">
              Total time worked
            </h3>
            <div className="text-4xl font-black text-white mb-6">
              {emp.totalTimeWorked?.hours || 0}
              <span className="text-sm font-medium text-gray-500 ml-1">
                hrs
              </span>{" "}
              {emp.totalTimeWorked?.min || 0}
              <span className="text-sm font-medium text-gray-500 ml-1">
                min
              </span>
            </div>

            <div className="h-3 w-full bg-[#0b141a] rounded-full overflow-hidden flex">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${emp.totalTimeWorked?.active || 0}%` }}
              ></div>
              <div
                className="h-full bg-green-500"
                style={{ width: `${emp.totalTimeWorked?.pause || 0}%` }}
              ></div>
              <div
                className="h-full bg-gray-700"
                style={{ width: `${emp.totalTimeWorked?.extra || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-[#142129] rounded-[2.5rem] p-8 border border-gray-800/40 shadow-xl">
            <h3 className="text-gray-200 font-bold mb-8 text-lg">
              Project completion
            </h3>
            <div className="space-y-7">
              {emp.projects?.map((p, i) => (
                <div key={p.id || i}>
                  <div className="flex justify-between text-xs mb-3 text-gray-400 font-medium">
                    <span>{p.name || p.title}</span>
                    <span className="text-blue-400">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#0b141a] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${p.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// مكونات مساعدة
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-gray-500 font-medium mb-1 text-[11px] uppercase tracking-wider">
      {label}
    </p>
    <p className="text-white font-semibold truncate">{value || "N/A"}</p>
  </div>
);

const StatCard = ({ title, value, color, description }) => (
  <div className="bg-[#142129] rounded-[2rem] p-6 border border-gray-800/40 hover:border-blue-500/30 transition-all shadow-lg">
    <p className="text-[10px] text-gray-500 font-black uppercase mb-3 tracking-widest">
      {title}
    </p>
    <div
      className={`text-4xl font-black ${color === "blue" ? "text-blue-400" : "text-gray-200"}`}
    >
      {value || 0}
    </div>
    <p className="text-[10px] text-gray-600 mt-3 font-medium leading-relaxed">
      {description}
    </p>
  </div>
);

export default EmployeeDetail;
