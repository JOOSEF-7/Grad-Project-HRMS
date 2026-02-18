import DataTable from '../table/DataTable';
import TableControls from '../table/TableControls';
import Pagination from '../table/Pagination';
import EditIcon from "@mui/icons-material/Edit";
import useTableController from '../../hooks/useTableController';
import RowActionMenu from '../UI/RowActionMenu';
import { useState } from 'react';
import { Eye, Trash2 } from "lucide-react";


// Generate avatar URL using UI Avatars
const getAvatarUrl = (name, background = '0D8ABC', color = 'fff') => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=80&bold=true&rounded=true`
}

const AttendanceBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
     case 'On-time':
     return 'bg-emerald-500/15 text-emerald-400 border-emerald-400/40'

    case 'Late':
    return 'bg-sky-500/15 text-sky-400 border-sky-400/40'

   case 'Absent':
   return 'bg-slate-500/20 text-slate-400 border-slate-400/40'

   case 'Part-time':
   return 'bg-slate-500/20 text-slate-400 border-slate-400/40'

    }
  }
    return (
    <span className={`"
    inline-flex items-center gap-2
    px-3 py-1
    rounded-full
    text-xs font-medium
    border
    backdrop-blur-sm" ${getStatusStyles()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  )
}




const employees = [
   {
    id: 'ID00021290',
    name: 'Ryan Henry',
    email: 'ryanhen@gmail.com',
    department: 'Developer',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Ryan Henry', '1e3a5f', '6ee7b7')
  },
  {
    id: 'ID00021291',
    name: 'Isabella Chloe',
    email: 'isabella@gmail.com',
    department: 'SMM',
    date: '1 Jan 2025',
    type: 'Contract',
    attendance: 'Part-time',
    avatar: getAvatarUrl('Isabella Chloe', '134e4a', '2dd4bf')
  },
  {
    id: 'ID00021292',
    name: 'Bessie Cooper',
    email: 'bessieco@gmail.com',
    department: 'Marketing',
    date: '1 Jan 2025',
    type: 'Part-time',
    attendance: 'Late',
    avatar: getAvatarUrl('Bessie Cooper', '7c2d12', 'fbbf24')
  },
  {
    id: 'ID00026609',
    name: 'Robert Fox',
    email: 'robbert@gmail.com',
    department: 'Design',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Late',
    avatar: getAvatarUrl('Robert Fox', '3f3f46', '94a3b8')
  },
  {
    id: 'ID002211232',
    name: 'Leslie Alexander',
    email: 'leslie@gmail.com',
    department: 'Editor',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Leslie Alexander', '1e3a5f', '6ee7b7')
  },
  {
    id: 'ID00021281',
    name: 'Cody Fisher',
    email: 'codyf@gmail.com',
    department: 'Manager',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Late',
    avatar: getAvatarUrl('Cody Fisher', '4c1d95', 'c4b5fd')
  },
  {
    id: 'ID00021290',
    name: 'Bessie Cooper',
    email: 'bessie@gmail.com',
    department: 'Content',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Bessie C', '0f766e', '5eead4')
  },
  {
    id: 'ID00021274',
    name: 'Dianne Russell',
    email: 'dianner@gmail.com',
    department: 'Finance',
    date: '1 Jan 2025',
    type: 'Contract',
    attendance: 'Absent',
    avatar: getAvatarUrl('Dianne Russell', '7c2d12', 'fed7aa')
  },
  {
    id: 'ID00021290',
    name: 'Annette Black',
    email: 'Annete@gmail.com',
    department: 'Marketing',
    date: '1 Jan 2025',
    type: 'Contract',
    attendance: 'On-time',
    avatar: getAvatarUrl('Annette Black', '1e3a5f', '6ee7b7')
  },
  {
    id: 'ID00021256',
    name: 'Theresa Webb',
    email: 'therese@gmail.com',
    department: 'Developer',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Absent',
    avatar: getAvatarUrl('Theresa Webb', '581c87', 'd8b4fe')
  },
  {
    id: 'ID00021292',
    name: 'Michael Scott',
    email: 'mscott@gmail.com',
    department: 'Manager',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Michael Scott', '164e63', '22d3ee')
  },
  {
    id: 'ID00021293',
    name: 'Pam Beesly',
    email: 'pbeesly@gmail.com',
    department: 'Reception',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Pam Beesly', '831843', 'f9a8d4')
  },
  {
    id: 'ID00021294',
    name: 'Jim Halpert',
    email: 'jhalpert@gmail.com',
    department: 'Sales',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Late',
    avatar: getAvatarUrl('Jim Halpert', '1e40af', '93c5fd')
  },
  {
    id: 'ID00021295',
    name: 'Dwight Schrute',
    email: 'dschrute@gmail.com',
    department: 'Sales',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Dwight Schrute', '713f12', 'fde047')
  },
  {
    id: 'ID00021296',
    name: 'Angela Martin',
    email: 'amartin@gmail.com',
    department: 'Finance',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Angela Martin', '4c1d95', 'c4b5fd')
  },
  {
    id: 'ID00021297',
    name: 'Kevin Malone',
    email: 'kmalone@gmail.com',
    department: 'Finance',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Late',
    avatar: getAvatarUrl('Kevin Malone', '7c2d12', 'fbbf24')
  },
  {
    id: 'ID00021298',
    name: 'Oscar Martinez',
    email: 'omartinez@gmail.com',
    department: 'Finance',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Oscar Martinez', '0f766e', '5eead4')
  },
  {
    id: 'ID00021299',
    name: 'Stanley Hudson',
    email: 'shudson@gmail.com',
    department: 'Sales',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Late',
    avatar: getAvatarUrl('Stanley Hudson', '3f3f46', 'e2e8f0')
  },
  {
    id: 'ID00021300',
    name: 'Phyllis Vance',
    email: 'pvance@gmail.com',
    department: 'Sales',
    date: '1 Jan 2025',
    type: 'Part-time',
    attendance: 'On-time',
    avatar: getAvatarUrl('Phyllis Vance', '831843', 'f9a8d4')
  },
  {
    id: 'ID00021301',
    name: 'Kelly Kapoor',
    email: 'kkapoor@gmail.com',
    department: 'Customer Service',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Absent',
    avatar: getAvatarUrl('Kelly Kapoor', '9d174d', 'fda4af')
  },
  {
    id: 'ID00021302',
    name: 'Ryan Howard',
    email: 'rhoward@gmail.com',
    department: 'Temp',
    date: '1 Jan 2025',
    type: 'Contract',
    attendance: 'Late',
    avatar: getAvatarUrl('Ryan Howard', '1e3a5f', '60a5fa')
  },
  {
    id: 'ID00021303',
    name: 'Meredith Palmer',
    email: 'mpalmer@gmail.com',
    department: 'Supplier Relations',
    date: '1 Jan 2025',
    type: 'Full-time',
    attendance: 'Absent',
    avatar: getAvatarUrl('Meredith Palmer', '581c87', 'd8b4fe')
  }
]





const EmployeesTable = () => {
const [openMenuId, setOpenMenuId] = useState(null);
const columns = [
  {
    header: "Employee",
    accessor: "name",
    render: (row) => (
      <div className="flex items-center gap-3">
        <img
          src={row.avatar || getAvatarUrl(row.name)}
          alt={row.name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-slate-100">
            {row.name}
          </p>
          <p className="text-xs text-slate-500">
            {row.id}
          </p>
        </div>
      </div>
    ),
  },

  { header: "Email", accessor: "email" },
  { header: "Department", accessor: "department" },
  { header: "Date", accessor: "date" },
  { header: "Type", accessor: "type" },

  {
    header: "Attendance",
    accessor: "attendance",
    render: (row) => <AttendanceBadge status={row.attendance} />,
  },

  {
    header: "Action",
    accessor: "action",
    render: (row) => (
      <div className="relative">
        <button
          onClick={() =>
            setOpenMenuId(openMenuId === row.id ? null : row.id)
          }
          className="p-2 text-slate-400 hover:text-slate-200"
        >
          <EditIcon />
        </button>

        <RowActionMenu
          isOpen={openMenuId === row.id}
          onClose={() => setOpenMenuId(null)}
          actions={[
            {
              label: "See Details",
              icon: Eye,
              onClick: () => console.log("View", row),
            },
            {
              label: "Delete",
              variant: "danger",
              icon: Trash2,
              onClick: () => console.log("Delete", row.id),
            },
          ]}
        />
      </div>
    ),
  },
];

const {
  currentData,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  recordsPerPage,
  setRecordsPerPage,
  currentPage,
  setCurrentPage,
  totalRecords,
  totalPages
  
} = useTableController({
  data: employees,
  searchKeys: ["name","email","department","type"],
  filterKey: "attendance",
  
})
const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setCurrentPage(page)
  }
}

const handleRecordsPerPageChange = (value) => {
  setRecordsPerPage(value)
  setCurrentPage(1)
}


  
  return (
     
       <div  className=
       "bg-gradient-to-br from-transparent/20 to-45% to-[#182731] p-8 rounded-[2.5rem] border border-gray-800/50 shadow-xl w-full"  >
       <TableControls
      searchTerm={searchQuery}
      setSearchTerm={setSearchQuery}
      filterValue={activeFilter}
      setFilterValue={setActiveFilter}
      filterOptions={["All", "On-time", "Late","Absent","Part-time"]}
      setCurrentPage={setCurrentPage}

      />
    
      <DataTable columns={columns} data={currentData} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        recordsPerPage={recordsPerPage}
        handleRecordsPerPageChange={handleRecordsPerPageChange}
        totalRecords={totalRecords}
        currentDataLength={currentData.length}
      />
    </div>
  
     
     

   
  );


};

export default EmployeesTable;
