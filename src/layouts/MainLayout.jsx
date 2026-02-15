import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar/SideBar";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  const isSidebarCollapsed = useSelector(
    (state) => state.ui.isSidebarCollapsed,
  );

  return (
    <div className="flex min-h-screen bg-[#0b141a]">
      <Sidebar />

      {/* المحتوى الرئيسي */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{
          //  ضبط المساحة حسب حالة السايد بار
          marginLeft: isSidebarCollapsed ? "15px" : "15px",
        }}
      >
        <Navbar />

        <main className="flex-1 p-6 pt-24 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
