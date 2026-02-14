import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProjects } from "../../store/slices/projectSlice";

const Project = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // حماية: لو السلايس مش موجود لأي سبب، هيرجع مصفوفة فاضية ومش هيعمل Crash
  const { list: projects, loading } = useSelector(
    (state) => state.projects || { list: [], loading: false },
  );

  const queryParams = new URLSearchParams(location.search);
  const highlightId = queryParams.get("highlightId");

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (highlightId && projects?.length > 0) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`project-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("flash-highlight");
          // شيل التأثير بعد 3 ثواني
          setTimeout(() => element.classList.remove("flash-highlight"), 3000);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [highlightId, projects]);

  if (loading && projects.length === 0) {
    return (
      <div className="p-10 text-white text-center">Loading Projects...</div>
    );
  }

  return (
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Project Management</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((task) => (
          <div
            key={task.id}
            id={`project-${task.id}`}
            className="p-6 bg-[#142129] border border-gray-800 rounded-[2.5rem] transition-all duration-500 hover:border-blue-500/30 group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                {task.title}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  task.status === "Completed"
                    ? "bg-green-500/10 text-green-500"
                    : "bg-blue-500/10 text-blue-500"
                }`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {task.desc}
            </p>

            <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800/50">
              <div className="flex -space-x-2">
                {task.members?.slice(0, 3).map((m, i) => (
                  <img
                    key={i}
                    src={m.image}
                    className="w-8 h-8 rounded-full border-2 border-[#142129]"
                    alt="member"
                  />
                ))}
                {task.members?.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-[#142129] flex items-center justify-center text-[10px] text-gray-400">
                    +{task.members.length - 3}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-bold uppercase">
                  Progress
                </p>
                <p className="text-sm text-white font-black">
                  {task.progress}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          No projects found.
        </div>
      )}
    </div>
  );
};

export default Project;
