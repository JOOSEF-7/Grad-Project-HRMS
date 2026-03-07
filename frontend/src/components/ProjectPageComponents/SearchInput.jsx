import { Search } from "lucide-react";

export default function SearchInput({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center bg-[#1B1E22] border border-white/10 rounded-xl px-3 py-2 w-80">
      <Search size={16} className="text-gray-400" />
      <input
        type="text"
        placeholder="Search here..."
        className="bg-transparent outline-none text-sm ml-2 text-white w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}