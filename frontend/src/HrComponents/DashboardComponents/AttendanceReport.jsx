import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AttendanceReport = ({ title, desc, data, filter }) => {
  // 1. 💡 اللوجيك الجديد: تحويل داتا الباك إيند لشكل يفهمه الشارت
  // لو الداتا مش موجودة (404/500)، بنعمل مصفوفة فاضية وأرقام صفرية كديفولت
  const weeklyStats = data?.weeklyAttendenceStats || [];

  // تحويل المسميات من (onTimeCount -> onTime) ليتوافق مع الـ Bar dataKey
  const chartData = weeklyStats.map(item => ({
    name: item.dayName.substring(0, 3), // Thursday -> Thu
    onTime: item.onTimeCount,
    late: item.lateCount,
    absent: item.absentCount
  }));

  // حساب الأرقام الإجمالية اللي بتظهر على الشمال (بناخد آخر يوم مسجل أو نضع 0)
  const lastDay = weeklyStats[weeklyStats.length - 1] || {};
  const stats = {
    onTime: lastDay.onTimeCount || 0,
    late: lastDay.lateCount || 0,
    absent: lastDay.absentCount || 0
  };

  return (
    <div className="bg-gradient-to-br from-transparent/20 to-45% to-[#182731] p-[20px] rounded-[2.5rem] border border-gray-800/50 shadow-xl w-full mb-8 min-h-[420px]">
      {/* الهيدر */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {desc}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-lg text-slate-300 text-sm hover:bg-slate-600/50 transition-colors">
          {filter}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* الأرقام (Stats) */}
        <div className="flex lg:flex-col justify-center gap-6 min-w-[105px]">
          <StatItem label="On-time" value={stats.onTime} color="bg-blue-500" />
          <StatItem label="Late attend" value={stats.late} color="bg-green-400" />
          <StatItem label="Absent" value={stats.absent} color="bg-gray-600" />
        </div>

        {/* منطقة الرسم البياني */}
        <div className="w-full lg:flex-1 h-[280px] min-h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            {chartData.length > 0 ? (
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="100%" stopColor="#0072ff" />
                  </linearGradient>
                  <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#43e97b" />
                    <stop offset="100%" stopColor="#38f9d7" />
                  </linearGradient>
                  <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45 2 2)">
                    <path d="M-1,2 l6,0" stroke="#374151" strokeWidth="2" />
                  </pattern>
                </defs>

                <CartesianGrid vertical={false} stroke="#1f2937" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#4b5563", fontSize: 11 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#4b5563", fontSize: 11 }} />

                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  contentStyle={{ backgroundColor: "#0b141a", border: "1px solid #1f2937", borderRadius: "12px", color: "#fff" }}
                />

                <Bar dataKey="onTime" fill="url(#blueGrad)" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="late" fill="url(#greenGrad)" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="absent" fill="url(#diagonalHatch)" radius={[6, 6, 0, 0]} barSize={20} stroke="#374151" />
              </BarChart>
            ) : (
              // 💡 لو مفيش داتا، بنعرض شكل "فاضي" شيك للمستخدم
              <div className="h-full flex flex-col items-center justify-center opacity-0 border-2 border-dashed border-gray-700 rounded-3xl">
                  <i className="fas fa-chart-bar text-4xl mb-2"></i>
                  <p className="text-xs font-bold uppercase tracking-widest">No Attendance Data</p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, color }) => (
  <div className="space-y-0.5">
    <div className="text-4xl font-black text-white tracking-tighter">
      {value}
    </div>
    <div className="flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
        {label}
      </span>
    </div>
  </div>
);

export default AttendanceReport;