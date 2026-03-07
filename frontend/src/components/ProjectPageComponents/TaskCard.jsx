
import { useState } from "react";

// صور افتراضية للموظفين
const defaultEmployees = [
  { name: "Alice", image: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob", image: "https://i.pravatar.cc/150?img=2" },
  { name: "Charlie", image: "https://i.pravatar.cc/150?img=3" },
];

// صور افتراضية للمشاريع
const defaultProjectImages = [
  "https://picsum.photos/300/150?random=1",
  "https://picsum.photos/300/150?random=2",
  "https://picsum.photos/300/150?random=3",
];

// Tags متنوعة
const types = [
  { text: "UI Design", color: "bg-purple-500/20 text-purple-400" },
  { text: "Marketing", color: "bg-green-500/20 text-green-400" },
  { text: "Social Media", color: "bg-blue-500/20 text-blue-400" },
];

// Priority متنوعة
const priorities = [
  { text: "Low", color: "bg-gray-500/20 text-gray-400" },
  { text: "Medium", color: "bg-yellow-500/20 text-yellow-400" },
  { text: "High", color: "bg-red-500/20 text-red-400" },
];

// دالة لاختيار عنصر عشوائي
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function TaskCard() {
  const [subtasks, setSubtasks] = useState([
    { id: 1, title: "Develop Core UI Components", done: true, priority: getRandom(priorities).text },
    { id: 2, title: "Implement Component States", done: true, priority: getRandom(priorities).text },
    { id: 3, title: "Write Responsive Layouts", done: false, priority: getRandom(priorities).text },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");

  const toggleSubtask = (id) => {
    setSubtasks(
      subtasks.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const handleEditSubtask = (id) => {
    setSubtasks(
      subtasks.map((s) =>
        s.id === id ? { ...s, title: editTitle } : s
      )
    );
    setEditingId(null);
    setEditTitle("");
  };

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim() === "") return;
    const newSubtask = {
      id: subtasks.length + 1,
      title: newSubtaskTitle,
      done: false,
      priority: getRandom(priorities).text,
    };
    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle("");
    setAdding(false);
  };

  const projectImage = getRandom(defaultProjectImages);
  const taskTags = [getRandom(types), getRandom(priorities)]; // كل كارت له Tags + Priority عشوائي

  return (
    <div className="bg-[#1B1E22] border border-white/10 rounded-2xl p-4 space-y-3 w-full">
      {/* Tags */}
      <div className="flex gap-2">
        {taskTags.map((tag, i) => (
          <span key={i} className={`text-xs px-2 py-1 rounded-lg ${tag.color}`}>
            {tag.text}
          </span>
        ))}
      </div>

      {/* Project Image */}
      <div className="h-28 w-full rounded-xl overflow-hidden">
        <img src={projectImage} alt="Project" className="w-full h-full object-cover" />
      </div>

      {/* Title + Description */}
      <h3 className="text-white font-medium">Sample Task Title</h3>
      <p className="text-gray-400 text-sm">
        A design system is a collection of reusable UI elements.
      </p>

      {/* Subtasks */}
      <div className="space-y-1">
        {subtasks.map((sub) => (
          <div key={sub.id} className="flex items-center gap-2">
            {/* Checkbox */}
            <div
              className={`w-4 h-4 border rounded-sm flex items-center justify-center ${
                sub.done ? "bg-green-500 border-green-500" : "border-gray-400"
              }`}
              onClick={() => toggleSubtask(sub.id)}
            >
              {sub.done && <span className="text-white text-xs">✔️</span>}
            </div>

            {/* Title / edit */}
            {editingId === sub.id ? (
              <input
                className="bg-[#1B1E22] border-b border-gray-500 text-white outline-none flex-1"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleEditSubtask(sub.id)}
                onKeyDown={(e) => e.key === "Enter" && handleEditSubtask(sub.id)}
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 ${sub.done ? "line-through text-gray-400" : "text-gray-200"}`}
                onDoubleClick={() => {
                  setEditingId(sub.id);
                  setEditTitle(sub.title);
                }}
              >
                {sub.title}
              </span>
            )}

            {/* Priority */}
            <span
              className={`text-xs px-2 py-1 rounded-lg ${
                sub.priority === "High"
                  ? "bg-red-500/20 text-red-400"
                  : sub.priority === "Medium"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {sub.priority}
            </span>
          </div>
        ))}
      </div>

      {/* Add new subtask */}
      {adding ? (
        <input
          type="text"
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onBlur={handleAddSubtask}
          onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
          placeholder="Enter subtask name..."
          className="w-full text-xs p-1 rounded border border-gray-500 bg-[#1B1E22] text-white outline-none mt-2"
          autoFocus
        />
      ) : (
        <div
          className="flex items-center gap-2 text-sm text-blue-400 cursor-pointer hover:underline mt-2"
          onClick={() => setAdding(true)}
        >
          <span className="text-lg font-bold">+</span>
          <span>Add new subtask</span>
        </div>
      )}

      {/* Footer avatars */}
      <div className="flex -space-x-2 mt-3">
        {defaultEmployees.map((emp, i) => (
          <img
            key={i}
            src={emp.image}
            alt={emp.name}
            className="w-6 h-6 rounded-full border border-[#1B1E22]"
          />
        ))}
      </div>
    </div>
  );
}