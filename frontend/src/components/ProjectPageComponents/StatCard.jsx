export default function StatCard({ title, value }) {
  return (
    <div className="bg-gradient-to-br from-transparent/20 to-45% to-[#182731] p-7 rounded-[2rem] border border-gray-800/50 relative group transition-all hover:border-blue-500/30 min-w-[140px]">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-white text-2xl font-semibold">{value}</h2>
    </div>
  );
}
