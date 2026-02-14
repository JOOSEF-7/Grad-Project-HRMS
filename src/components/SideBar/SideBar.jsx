import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import icon from "../../assets/icons/Icon.svg";

const Sidebar = () => {
  const isCollapsed = useSelector((state) => state.ui.isSidebarCollapsed);

  const menuItems = [
    { name: "Dashboard", icon: "fas fa-th-large", path: "/dashboard" },
    { name: "Employees", icon: "fas fa-users", path: "/employees" },
    { name: "Project", icon: "fas fa-project-diagram", path: "/project" },
    { name: "Payroll", icon: "fas fa-wallet", path: "/payroll" },
    { name: "Hiring", icon: "fas fa-user-plus", path: "/hiring" },
    { name: "Attendance", icon: "fas fa-calendar-check", path: "/attendance" },
    { name: "Leave", icon: "fas fa-envelope-open-text", path: "/leave" },
    { name: "Performance", icon: "fas fa-chart-line", path: "/performance" },
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 175 }}
      className="h-screen  bg-[#0b161d] text-gray-400 flex flex-col border-r border-gray-900 sticky top-0 overflow-hidden z-50"
    >
      {/* Logo */}
      <NavLink
        to="/dashboard"
        className={`h-20 flex items-center px-6 mb-4 ${isCollapsed ? "justify-center" : "justify-start gap-3 transition-transform hover:scale-105"}`}
      >
        {" "}
        <div className="w-9  rounded-full flex items-center justify-center  shrink-0">
          {" "}
          <img src={icon} alt="Staffly Logo" className="w-8 h-8" />
        </div>
        {!isCollapsed && (
          <span className="text-xl text-white font-bold tracking-tight italic">
            Staf<span className="text-blue-500 cursor-pointer">fly</span>
          </span>
        )}
      </NavLink>


      {/* Menu Items */}
      <div className="flex-1 px-3 space-y-2">
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
              <span className="text-sm font-medium">{item.name}</span>
            )}

            {/* Tooltip لو السايد بار مصغر */}
            {isCollapsed && (
              <span className="absolute left-full ml-4 px-2 py-1 bg-blue-100 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100]">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
