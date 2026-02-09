
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar.jsx";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#121417] text-white">
      
      {/* Sidebar */}
      <SideBar />

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}
