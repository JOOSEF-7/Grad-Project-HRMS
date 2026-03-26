function EmployeeStep({ data, onChange }) {
  return (
    <div className="space-y-4">

      {/* Job Title */}
      <div>
        <label className="text-xs text-gray-400">Job title</label>
        <input
          type="text"
          value={data.jobTitle}
          onChange={(e) => onChange("jobTitle", e.target.value)}
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
        />
      </div>

      {/* Department + Work Location */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400">Department</label>
          <select
            value={data.department}
            onChange={(e) => onChange("department", e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          >
            <option value="" className="bg-[#1A1D24] text-white">Select</option>
            <option className="bg-[#1A1D24] text-white">Design</option>
            <option className="bg-[#1A1D24] text-white">Development</option>
            <option className="bg-[#1A1D24] text-white">Marketing</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400">Work location</label>
          <select
            value={data.workLocation}
            onChange={(e) => onChange("workLocation", e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          >
            <option value="" className="bg-[#1A1D24] text-white">Select</option>
            <option className="bg-[#1A1D24] text-white">On-site</option>
            <option className="bg-[#1A1D24] text-white">Remote</option>
            <option className="bg-[#1A1D24] text-white">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Job Type + Joining */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400">Job type</label>
          <select
            value={data.jobType}
            onChange={(e) => onChange("jobType", e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          >
            <option value="" className="bg-[#1A1D24] text-white">Select</option>
            <option className="bg-[#1A1D24] text-white">Full-time</option>
            <option className="bg-[#1A1D24] text-white">Part-time</option>
            <option className="bg-[#1A1D24] text-white">Contract</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400">Joining</label>
          <input
            type="date"
            value={data.joiningDate}
            onChange={(e) => onChange("joiningDate", e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Salary */}
      <div>
        <label className="text-xs text-gray-400">Salary</label>
        <input
          type="number"
          value={data.salary}
          onChange={(e) => onChange("salary", e.target.value)}
          className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 outline-none"
        />
      </div>

    </div>
  );
};


export default EmployeeStep