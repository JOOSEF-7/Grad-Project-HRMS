import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AttendanceReport = ({ title, desc, data }) => {
  if (!data) return null;

  const { stats, chartData } = data;

  return (
    <div className="bg-gradient-to-br from-transparent/20 to-45% to-[#182731] p-8 rounded-[2.5rem] border border-gray-800/50 shadow-xl w-full">
      <div className="mb-10">
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">
          {desc}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col justify-center gap-8 min-w-[140px]">
          <StatItem label="On-time" value={stats.onTime} color="bg-blue-500" />
          <StatItem
            label="Late attend"
            value={stats.late}
            color="bg-green-400"
          />
          <StatItem label="Absent" value={stats.absent} color="bg-gray-600" />
        </div>

        <div className="flex-1 h-[320px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
                <pattern
                  id="diagonalHatch"
                  patternUnits="userSpaceOnUse"
                  width="4"
                  height="4"
                  patternTransform="rotate(45 2 2)"
                >
                  <path d="M-1,2 l6,0" stroke="#374151" strokeWidth="2" />
                </pattern>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#1f2937"
                strokeDasharray="3 3"
                opacity={0.5}
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4b5563", fontSize: 11 }}
                dy={15}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#4b5563", fontSize: 11 }}
                domain={[0, "dataMax + 2"]}
              />

              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
                contentStyle={{
                  backgroundColor: "#0b141a",
                  border: "1px solid #1f2937",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                itemStyle={{ fontSize: "12px", padding: "2px 0" }}
              />

              <Bar
                dataKey="onTime"
                fill="url(#blueGrad)"
                radius={[8, 8, 8, 8]}
                barSize={27}
                minPointSize={5}
              />
              <Bar
                dataKey="late"
                fill="url(#greenGrad)"
                radius={[8, 8, 8, 8]}
                barSize={27}
                minPointSize={5}
              />
              <Bar
                dataKey="absent"
                fill="url(#diagonalHatch)"
                radius={[8, 8, 8, 8]}
                barSize={27}
                stroke="#374151"
                minPointSize={5}
              />
            </BarChart>
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
