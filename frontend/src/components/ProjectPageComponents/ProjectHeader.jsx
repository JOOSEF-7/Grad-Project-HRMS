
import { Plus } from "lucide-react";
import { useState } from "react";
import StatCard from "../ProjectPageComponents/StatCard.jsx";
import SearchBar from "../ProjectPageComponents/SearchInput.jsx";
import AddProjectModal from "./AddProjectModel.jsx";


const stats = [
  { title: "All Project", value: 12 },
  { title: "On-going", value: 4 },
  { title: "Pending", value: 2 },
  { title: "Completed", value: 4 },
];

export default function ProjectHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-white text-2xl font-semibold">Project</h1>

        <div className="flex gap-3 items-center flex-wrap">
          {stats.map((s) => (
            <StatCard key={s.title} {...s} />
          ))}

          <SearchBar />

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl text-white transition"
          >
            <Plus size={16} />
            Add project
          </button>
        </div>
      </div>

      {open && <AddProjectModal onClose={() => setOpen(false)} />}
    </>
  );
}