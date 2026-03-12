// components/Leave/LeaveRow.jsx
import { useNavigate } from "react-router-dom";

export default function LeaveRow({ leave }) {
  const navigate = useNavigate();

  return (
    <tr className="border-b border-gray-700 hover:bg-[#1A2127]">
      <td className="p-3 text-white">{leave.name}</td>
      <td className="p-3 text-gray-300">{leave.type}</td>
      <td className="p-3 text-gray-300">{leave.from}</td>
      <td className="p-3 text-gray-300">{leave.to}</td>
      <td className="p-3 text-gray-300">{leave.days}</td>
      <td className="p-3">
        <button
          onClick={() => navigate(`/leave-details/${leave.id}`)}
          className="text-blue-500 underline"
        >
          View
        </button>
      </td>
      <td className="p-3 flex gap-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded">
          Approve
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">
          Reject
        </button>
      </td>
    </tr>
  );
}