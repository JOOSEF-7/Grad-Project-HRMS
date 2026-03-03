import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../components/SideBar/SideBar";
import Navbar from "../components/navbar/Navbar";

const MainLayout = () => {
  const isSidebarCollapsed = useSelector(
    (state) => state.ui.isSidebarCollapsed,
  );

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      {/* المحتوى الرئيسي */}
      <div
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{
          //  ضبط المساحة حسب حالة السايد بار
          // marginLeft: isSidebarCollapsed ? "6px" : "6px",
          // marginLeft:"6px" 
        }}
      >
        <Navbar />

        <main className="flex-1 p-2 pt-18 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
