import React from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#0b141a] text-white overflow-hidden">
      {/*  بالتقديم على وظيفة */}
      <div
        onClick={() => navigate("/job")}
        className="flex-1 flex flex-col items-center justify-center cursor-pointer group transition-all duration-500 hover:bg-[#142129] relative border-b md:border-b-0 md:border-r border-gray-800"
      >
        <div className="z-10 text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i className="fas fa-briefcase text-2xl text-blue-400"></i>
          </div>
          <h2 className="text-3xl font-bold mb-2">التقديم على وظيفة</h2>
          <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            اكتشف الفرص المتاحة وانضم لفريقنا
          </p>
        </div>
      </div>

      {/* بتسجيل الدخول */}
      <div
        onClick={() => navigate("/login")}
        className="flex-1 flex flex-col items-center justify-center cursor-pointer group transition-all duration-500 hover:bg-[#142129] relative"
      >
        <div className="z-10 text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <i className="fas fa-user-shield text-2xl text-blue-400"></i>
          </div>
          <h2 className="text-3xl font-bold mb-2">تسجيل الدخول (HR)</h2>
          <p className="text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
            إدارة النظام والموظفين
          </p>
        </div>
      </div>

      {/* لوجو الشركة */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold italic">
          S
        </div>
        <span className="text-2xl font-bold tracking-tight">Staffly</span>
      </div>
    </div>
  );
};

export default Splash;
