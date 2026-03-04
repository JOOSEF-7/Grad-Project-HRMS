
import TaskCard from "../ProjectPageComponents/TaskCard.jsx";

export default function Column({ title, selectedFilter }) {
  const tasks = [
    { id: 1, title: "Landing Page", description: "Design the homepage", tag: "UI Design", priority: "High", status: "Todo" },
    { id: 2, title: "Social Campaign", description: "Run Instagram ads", tag: "Marketing", priority: "Medium", status: "On-going" },
    { id: 3, title: "Marketing Plan", description: "Quarterly marketing plan", tag: "Marketing", priority: "Low", status: "Pending" },
    { id: 4, title: "UI Prototype", description: "Design mobile screens", tag: "UI Design", priority: "Medium", status: "Todo" },
    { id: 5, title: "Email Campaign", description: "Send newsletter", tag: "Marketing", priority: "High", status: "On-going" },
  ];

  const filteredTasks = tasks.filter((task) => {
    // فلترة حسب Column
    if (task.status !== title) return false;

    // فلترة حسب selectedFilter
    if (!selectedFilter) return true;

    return task.tag === selectedFilter || task.priority === selectedFilter;
  });

  return (
    <div className="bg-[#16181C] rounded-2xl p-4 w-[320px] flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} title={task.title} description={task.description} />
        ))}
      </div>
    </div>
  );
}