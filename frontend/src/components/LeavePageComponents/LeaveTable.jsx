
import LeaveRow from "./LeaveRow";

export default function LeaveTable({ leaves }) {
  return (
    <div className="bg-[#1f2937] p-6 rounded-xl w-full">
      <table className="w-full text-white">
        <thead className="text-gray-300 text-left">
          <tr>
            <th className="p-3">Employee</th>
            <th className="p-3">Leave Type</th>
            <th className="p-3">From</th>
            <th className="p-3">To</th>
            <th className="p-3">Days</th>
            <th className="p-3">Details</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <LeaveRow key={leave.id} leave={leave} />
          ))}
        </tbody>
      </table>
    </div>
  );
}