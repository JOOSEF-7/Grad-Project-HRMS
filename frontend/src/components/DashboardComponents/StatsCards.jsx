import { useNavigate } from "react-router-dom";

const StatsCards = ({ stats }) => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Total employees",
      value: stats?.employees?.value,
      change: stats?.employees?.change,
      up: stats?.employees?.up,
      path: "/employees",
    },
    {
      title: "Job applicants",
      value: stats?.applicants?.value,
      change: stats?.applicants?.change,
      up: stats?.applicants?.up,
      path: "/hiring",
    },
    {
      title: "Total payroll",
      value: stats?.payroll?.value,
      change: stats?.payroll?.change,
      up: stats?.payroll?.up,
      path: "/payroll",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-transparent/20 to-45% to-[#182731] p-7 rounded-[2rem] border border-gray-800/50 relative group transition-all hover:border-blue-500/30"
        >
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
            {card.title}
          </p>

          <h2 className="text-3xl font-black text-white mb-4">
            {card.value || "0"}
          </h2>

          <div
            className={`text-xs font-bold flex items-center gap-1 ${card.up ? "text-green-500" : "text-pink-500"}`}
          >
            <i className={`fas fa-arrow-${card.up ? "up" : "down"}`}></i>
            {card.change}
            <span className="text-gray-600 font-medium ml-1 text-[10px]">
              vs last month
            </span>
          </div>

          <button
            onClick={() => navigate(card.path)}
            className="absolute top-7 right-7 w-8 h-8 bg-[#0b141a] rounded-full flex items-center justify-center text-gray-500 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all active:scale-90 border border-transparent group-hover:border-blue-500/20"
          >
            <i className="fas fa-arrow-right -rotate-45 text-xs"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
