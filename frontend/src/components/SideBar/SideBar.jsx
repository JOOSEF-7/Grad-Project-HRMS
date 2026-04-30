import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import icon from "../../assets/icons/Icon.svg";
import { logoutUser } from "../../store/HrSlices/auth/loginSlice"; // تأكدي من المسار

const Sidebar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.ui.isSidebarCollapsed);

  // 1. جلب بيانات المستخدم والرول من الهيكل الجديد في الريدوكس
  const { user } = useSelector((state) => state.auth);
  const userRole = user?.general?.role; // القيمة ستكون "HR" أو "EMPLOYEE"

  // 2. قوائم المنيو المخصصة لكل رول
  const hrMenuItems = [
    { name: "Dashboard", icon: "fas fa-th-large", path: "/dashboard" },
    { name: "Employees", icon: "fas fa-users", path: "/employees" },
    { name: "Project", icon: "fas fa-project-diagram", path: "/project" },
    { name: "Payroll", icon: "fas fa-wallet", path: "/payroll" },
    { name: "Hiring", icon: "fas fa-user-plus", path: "/hiring" },
    { name: "Attendance", icon: "fas fa-calendar-check", path: "/attendance" },
    {
      name: "Leave",
      icon: "fas fa-envelope-open-text",
      path: "/leave-requests",
    },
    { name: "Performance", icon: "fas fa-chart-line", path: "/performance" },
  ];

  const employeeMenuItems = [
    { name: "Dashboard", icon: "fas fa-th-large", path: "/my-dashboard" },
    { name: "My Profile", icon: "fas fa-user-circle", path: "/profile" },
    { name: "Attendance", icon: "fas fa-calendar-alt", path: "/attendance" },
    { name: "Leaves", icon: "fas fa-plane", path: "/leave" },
    { name: "My Requests", icon: "fas fa-file-alt", path: "/my-requests" },
    { name: "Tasks", icon: "fas fa-check-circle", path: "/tasks", badge: 3 }, // مثال للرقم الذي ظهر في صورتك
    { name: "Notifications", icon: "fas fa-bell", path: "/notifications" },
  ];

  // 3. اختيار القائمة المناسبة بناءً على الدور
  const menuItems = userRole === "HR" ? hrMenuItems : employeeMenuItems;

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 175 }}
      className="h-screen bg-[#0b161d] text-gray-400 flex flex-col border-r border-gray-900 sticky top-0 overflow-hidden z-50"
    >
      {/* Logo: يتوجه للداشبورد الصحيحة حسب الرول */}
      <NavLink
        to={userRole === "HR" ? "/dashboard" : "/my-dashboard"}
        className={`h-20 flex items-center px-6 mb-4 ${isCollapsed ? "justify-center" : "justify-start gap-3 transition-transform hover:scale-105"}`}
      >
        <div className="w-9 rounded-full flex items-center justify-center shrink-0">
          <img src={icon} alt="Staffly Logo" className="w-8 h-8" />
        </div>
        {!isCollapsed && (
          <span className="text-xl text-white font-bold tracking-tight italic">
            Staf<span className="text-blue-500 cursor-pointer">fly</span>
          </span>
        )}
      </NavLink>

      {/* Menu Items */}
      <div className="flex-1 px-3 space-y-2 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] text-gray-600 font-black uppercase mb-4 ml-3 tracking-widest">
          {isCollapsed ? "•••" : "Main Menu"}
        </p>

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3.5 rounded-xl transition-all group relative ${
                isActive
                  ? "bg-linear-to-t from-transparent/20 to-45% to-[#182731] text-white shadow-lg shadow-blue-500/30"
                  : "hover:bg-[#142129] hover:text-white"
              } ${isCollapsed ? "justify-center px-0" : ""}`
            }
          >
            <i
              className={`${item.icon} text-lg ${isCollapsed ? "" : "w-5"}`}
            ></i>

            {!isCollapsed && (
              <span className="text-sm font-medium flex-1">{item.name}</span>
            )}

            {/* عرض التنبيهات (Badges) للموظف فقط */}
            {!isCollapsed && item.badge && (
              <span className="bg-blue-500 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-black animate-pulse">
                {item.badge}
              </span>
            )}

            {/* Tooltip لو السايد بار مصغر */}
            {isCollapsed && (
              <span className="absolute left-full ml-4 px-3 py-2 bg-blue-500 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-[100] shadow-2xl">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* زر تسجيل الخروج في الأسفل */}
      <div className="p-3 border-t border-gray-900/50">
        <button
          onClick={() => dispatch(logoutUser())}
          className={`w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all ${isCollapsed ? "justify-center" : ""}`}
        >
          <i className="fas fa-sign-out-alt text-lg"></i>
          {!isCollapsed && <span className="text-sm font-bold">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
