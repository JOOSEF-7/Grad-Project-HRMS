import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAttendanceByEmployee, setSelectedMonth } from "../../../../store/HrSlices/attendance/attendanceSlice";
import DataTable from "../../../../components/table/DataTable";
import Pagination from "../../../../components/table/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import RowActionMenu from "../../../../components/UI/RowActionMenu";
import BaseCard from "../../../../components/UI/Card";
import ReusableCalendar from "../../../../components/UI/ReusableCalendar";
import { Eye, Trash2 } from "lucide-react";

const statusConfig = {
  "On Time": {
    bg: "var(--pill-green-bg)",
    text: "var(--pill-green-text)",
    border: "var(--pill-green-border)",
  },
  Late: {
    bg: "var(--pill-blue-bg)",
    text: "var(--pill-blue-text)",
    border: "var(--pill-blue-border)",
  },
  Absent: {
    bg: "var(--tab-inactive-bg)",
    text: "var(--text-muted)",
    border: "var(--border-main)",
  },
};

const AttendanceBadge = ({ status }) => {
  const config = statusConfig[status] ?? {
    bg: "var(--tab-inactive-bg)",
    text: "var(--text-muted)",
    border: "var(--border-main)",
  };

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
      style={{
        background: config.bg,
        color: config.text,
        borderColor: config.border,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.text }}
      />
      {status}
    </span>
  );
};

const AttendanceHistoryCard = ({ employeeId }) => {
  const dispatch = useDispatch();
  const { attendanceList, pagination, selectedMonth, loading } = useSelector(
    (state) => state.attendance
  );

  const [openMenuId, setOpenMenuId] = useState(null);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const getMonthYear = () => {
    if (!selectedMonth) return {};
    const [year, month] = selectedMonth.split("-");
    return { month: parseInt(month), year: parseInt(year) };
  };

  const safePagination = pagination ?? {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 10,
  };

  useEffect(() => {
    if (!employeeId) return;
    const { month, year } = getMonthYear();
    dispatch(fetchAttendanceByEmployee({
      employeeId,
      page: 1,
      limit: recordsPerPage,
      month,
      year,
    }));
  }, [dispatch, employeeId, selectedMonth, recordsPerPage]);

  const handleMonthSave = (newMonthValue) => {
    dispatch(setSelectedMonth(newMonthValue));
  };

  const handlePageChange = (newPage) => {
    const { month, year } = getMonthYear();
    dispatch(fetchAttendanceByEmployee({
      employeeId,
      page: newPage,
      limit: recordsPerPage,
      month,
      year,
    }));
  };

  const handleRecordsPerPageChange = (newLimit) => {
    setRecordsPerPage(newLimit);
  };

  const columns = [
    { header: "Date", accessor: "date" },
    {
      header: "Check In",
      accessor: "checkIn",
      render: (row) =>
        row.checkIn
          ? new Date(row.checkIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "—",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => <AttendanceBadge status={row.status} />,
    },
    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <div className="relative">
          <button
            onClick={() => setOpenMenuId(openMenuId === row._id ? null : row._id)}
            className="p-2 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <EditIcon fontSize="small" />
          </button>
          <RowActionMenu
            isOpen={openMenuId === row._id}
            onClose={() => setOpenMenuId(null)}
            actions={[
              {
                label: "See Details",
                icon: Eye,
                onClick: () => console.log("See Details", row._id),
              },
              {
                label: "Delete",
                variant: "danger",
                icon: Trash2,
                onClick: () => console.log("Delete", row._id),
              },
            ]}
          />
        </div>
      ),
    },
  ];

  return (
    <BaseCard padding="p-0">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5"
        style={{ borderBottom: "1px solid var(--border-main)" }}
      >
        <h3 className="font-semibold text-lg" style={{ color: "var(--text-main)" }}>
          Attendance History
        </h3>
        <ReusableCalendar
          mode="month"
          value={selectedMonth}
          onSave={handleMonthSave}
        />
      </div>

      {/* Table */}
      <div className={loading ? "opacity-50 pointer-events-none" : ""}>
        <DataTable columns={columns} data={attendanceList} />
      </div>

      {/* Pagination */}
      <Pagination
        pagination={safePagination}
        handlePageChange={handlePageChange}
        handleRecordsPerPageChange={handleRecordsPerPageChange}
        currentDataLength={attendanceList.length}
      />
    </BaseCard>
  );
};

export default AttendanceHistoryCard;