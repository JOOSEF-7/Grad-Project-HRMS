import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token, user, loading } = useSelector((state) => state.auth);

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // 1. التحقق من وجود التوكن
  if (!token || token === "undefined" || token === "null") {
    return <Navigate to="/login" replace />;
  }

  // 2. التحقق من صلاحية الـ Role (HR فقط)
  if (user && user.role !== "hr") {
    // إذا كان المستخدم مسجل دخول لكن ليس HR
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
        <div className="text-center bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md">
          <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400 mb-6">
            Only HR accounts can access this dashboard.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
            className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
