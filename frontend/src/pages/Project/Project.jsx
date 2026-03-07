
import ProjectHeader from "../../components/ProjectPageComponents/ProjectHeader.jsx";
import Column from "../../components/ProjectPageComponents/Column.jsx";

const columns = ["Todo", "On-going", "Pending", "Completed"];

export default function Project() {
  return (
    <div className="p-6 space-y-6 bg-[#0F1115] min-h-screen">
      <ProjectHeader />
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((col) => (
          <Column key={col} title={col} />
        ))}
      </div>
    </div>
  );
}