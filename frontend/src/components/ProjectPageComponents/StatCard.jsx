export default function StatCard({ title, value }) {
  return (
    <div className="bg-[#1B1E22] border border-white/10 rounded-2xl p-4 min-w-[140px]">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-white text-2xl font-semibold">{value}</h2>
    </div>
  );
}