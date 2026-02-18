import { useNavigate } from "react-router-dom";
export default function Sett() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b141a]">
      <div className="text-center">
        <i className="fas fa-briefcase text-6xl text-blue-500 mb-4"></i>
        <h2 className="text-2xl font-bold text-white mb-2">settings</h2>
        <p className="text-gray-400">Coming Soon...</p>
      </div>
    </div>
  );
}
