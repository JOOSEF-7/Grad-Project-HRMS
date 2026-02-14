import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TaskSummary = ({ data = [] }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("On-going");
  const tabs = ["Todo", "On-going", "Pending", "Completed"];

  const filteredTasks = data.filter((task) => task.status === activeTab);

  return (
    <div className="bg-linear-to-br from-transparent/20 to-45% to-[#182731] rounded-[2.5rem] p-8 border border-gray-800/50 flex flex-col h-full shadow-2xl overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-white">Task summary</h3>
        <button
          onClick={() => navigate("/project")}
          className="w-9 h-9 bg-[#0b141a] rounded-full flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all border border-transparent hover:border-blue-500/30"
        >
          <i className="fas fa-arrow-right -rotate-45 text-xs"></i>
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-1.5 bg-transparent p-1.5 rounded-2xl mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
              activeTab === tab
                ? "bg-linear-to-br from-transparent/20 to-45% to-[#182731] text-white shadow-2xl border border-gray-900"
                : "text-gray-600 hover:text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* منطقة السكرول - السكرول هنا خفي ومساحته محكومة بـ max-h */}
      <div className="space-y-6 overflow-y-auto scrollbar-hide flex-1 pr-1 max-h-[1170px]">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              // التوجيه لصفحة المشاريع مع الوميض عند الضغط
              onClick={() => navigate(`/project?highlightId=${task.id}`)}
              className="group border-b border-gray-800/40 pb-6 last:border-0 hover:bg-white/[0.01] cursor-pointer transition-all p-2 rounded-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-200 group-hover:text-blue-400 transition-colors">
                  {task.title}
                </h4>
                <span className="text-[10px] text-gray-300 font-bold flex items-center gap-1.5">
                  <i className="far fa-clock text-white/70"></i> {task.timeAgo}
                </span>
              </div>

              <p className="text-[11px] text-gray-600 mb-4 leading-relaxed line-clamp-1">
                {task.desc}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-1.5 bg-[#0b141a] rounded-full relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${task.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  />
                </div>
                <span className="text-[10px] font-black text-gray-400 w-8">
                  {task.progress}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4 text-[10px] text-gray-300 font-black">
                  {/* الأعداد قادمة محسوبة من الباك إند */}
                  <span>
                    <i className="far fa-comment-alt mr-1"></i>{" "}
                    {task.commentsCount || 0}
                  </span>
                  <span>
                    <i className="fas fa-paperclip mr-1"></i>{" "}
                    {task.attachmentsCount || 0}
                  </span>
                </div>

                <div className="flex -space-x-2.5">
                  {task.members?.slice(0, 3).map((member, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-full border-2 border-[#142129] bg-gray-800 overflow-hidden shadow-lg transform hover:scale-110 transition-transform"
                    >
                      <img
                        src={member.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {task.members?.length > 3 && (
                    <div className="w-7 h-7 rounded-full border-2 border-[#142129] bg-[#1c2e38] text-blue-500 text-[9px] flex items-center justify-center font-black shadow-lg">
                      +{task.members.length - 3}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-20">
            <i className="fas fa-tasks text-4xl mb-4"></i>
            <p className="text-xs uppercase tracking-widest font-bold">
              No {activeTab} tasks
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSummary;
