
import TaskCard from "../ProjectPageComponents/TaskCard.jsx";

export default function Column({ title }) {
  return (
    <div className="bg-[#16181C] rounded-2xl p-4 w-[320px] flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        <TaskCard title="Landing Page" description="Design the homepage" />
        <TaskCard title="Social Campaign" description="Run Instagram ads" />
        <TaskCard title="Marketing Plan" description="Quarterly marketing plan" />
      </div>
    </div>
  );
}