import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// التغيير هنا: استدعاء الأكشن والسلايس الجديد
import { fetchAllApplicants } from "../../store/slices/hiringSlice";

const Hiring = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // سحب البيانات من hiringSlice الجديد
  const { list: applicants, loading } = useSelector((state) => state.hiring);

  const queryParams = new URLSearchParams(location.search);
  const highlightId = queryParams.get("highlightId");

  useEffect(() => {
    // جلب البيانات من الهايرينج سلايس
    dispatch(fetchAllApplicants());
  }, [dispatch]);

  useEffect(() => {
    if (highlightId && applicants.length > 0) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`hiring-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("flash-highlight");
          setTimeout(() => element.classList.remove("flash-highlight"), 3000);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [highlightId, applicants]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-8">Job Applicants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applicants.map((app) => (
          <div
            key={app.id}
            id={`hiring-${app.id}`}
            className="p-6 bg-[#142129] border border-gray-800 rounded-[2rem] flex items-center gap-4 transition-all duration-500"
          >
            <img
              src={app.image}
              className="w-16 h-16 rounded-2xl object-cover"
              alt=""
            />
            <div>
              <h3 className="text-white font-bold">{app.name}</h3>
              <p className="text-blue-500 text-xs font-medium">{app.role}</p>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase ${app.status === "Hired" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}
              >
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <p className="text-center text-gray-500">Loading applicants...</p>
      )}
      {!loading && applicants.length === 0 && (
        <p className="text-center text-gray-500">No applicants found.</p>
      )}
    </div>
  );
};

export default Hiring;
