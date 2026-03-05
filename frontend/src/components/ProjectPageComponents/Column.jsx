
// import TaskCard from "../ProjectPageComponents/TaskCard.jsx";

// export default function Column({ title }) {
//   return (
//     <div className="bg-[#16181C] rounded-2xl p-4 w-[320px] flex-shrink-0">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-white font-semibold">{title}</h3>
//       </div>
//       <div className="space-y-4">
//         <TaskCard title="Landing Page" description="Design the homepage" />
//         <TaskCard title="Social Campaign" description="Run Instagram ads" />
//         <TaskCard title="Marketing Plan" description="Quarterly marketing plan" />
//       </div>
//     </div>
//   );
// }
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard.jsx";

export default function Column({ id, title, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-[#1B1E22] rounded-2xl p-4 w-[320px] flex-shrink-0 border border-white/10"
    >
      <h3 className="text-white font-semibold mb-4">{title}</h3>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
          />
        ))}
      </div>
    </div>
  );
}