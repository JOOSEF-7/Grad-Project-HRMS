
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllLeaves } from '../../store/slices/leaveSlice';
import { updateLeaveStatus } from '../../store/slices/leaveSlice';


const Leave = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // سحب البيانات من السلايس مع حماية
  const { list: leaves, loading } = useSelector((state) => state.leaves || { list: [], loading: false });

  const queryParams = new URLSearchParams(location.search);
  const highlightId = queryParams.get("highlightId");

  useEffect(() => {
    dispatch(fetchAllLeaves());
  }, [dispatch]);

  // منطق الوميض (Flash Highlight)
  useEffect(() => {
    if (highlightId && leaves.length > 0) {
      const timer = setTimeout(() => {
        const element = document.getElementById(`leave-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('flash-highlight');
          setTimeout(() => element.classList.remove('flash-highlight'), 3000);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [highlightId, leaves]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Leave Requests</h1>
        <div className="flex gap-3">
            <span className="bg-blue-500/10 text-blue-500 px-4 py-2 rounded-xl text-sm font-bold border border-blue-500/20">
                Total: {leaves.length}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* هعرضها في شكل صفوف (Rows) عشان تبان كجدول احترافي */}
        {leaves.map((request) => (
          <div 
            key={request.id} 
            id={`leave-${request.id}`} 
            className="p-5 bg-[#142129] border border-gray-800 rounded-2xl flex flex-wrap items-center justify-between gap-4 transition-all duration-500 hover:border-gray-700 group"
          >
            <div className="flex items-center gap-4 min-w-[200px]">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-blue-500 font-bold border border-gray-700">
                {request.employeeName?.charAt(0)}
              </div>
              <div>
                <p className="text-white font-bold">{request.employeeName}</p>
                <p className="text-gray-500 text-xs">{request.type} Leave</p>
              </div>
            </div>

            <div className="min-w-[120px]">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Duration</p>
              <p className="text-gray-300 text-sm font-medium">{request.duration}</p>
            </div>

            <div className="min-w-[120px]">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Date</p>
              <p className="text-gray-300 text-sm font-medium">{request.date}</p>
            </div>

            <div className="min-w-[100px]">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                request.status === 'Approved' ? 'bg-green-500/10 text-green-500' : 
                request.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {request.status}
              </span>
            </div>

            <div className="flex gap-2">
  <button 
    onClick={() => dispatch(updateLeaveStatus({ id: request.id, status: 'Approved' }))}
    className="w-9 h-9 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white"
  >
    <i className="fas fa-check text-xs"></i>
  </button>
  
  <button 
    onClick={() => dispatch(updateLeaveStatus({ id: request.id, status: 'Rejected' }))}
    className="w-9 h-9 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white"
  >
    <i className="fas fa-times text-xs"></i>
  </button>
</div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center text-gray-500 mt-10">Loading leaves...</p>}
      {!loading && leaves.length === 0 && <p className="text-center text-gray-500 mt-10">No leave requests found.</p>}
    </div>
  );
};

export default Leave;




