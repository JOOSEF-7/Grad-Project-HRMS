import { useState, useMemo } from 'react'

// Generate avatar URL using UI Avatars
const getAvatarUrl = (name, background = '0D8ABC', color = 'fff') => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}&size=80&bold=true&rounded=true`
}

// Sample employee data
const employeesData = [
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
    id: 'ID00021290',
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
    id: 'ID00021291',
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
    id: 'ID00021291',
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
    id: 'ID00021291',
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

const AttendanceBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'On-time':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
      case 'Late':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40'
      case 'Absent':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40'
      case 'Part-time':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40'
    }
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      {status}
    </span>
  )
}

const FilterTab = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-white text-slate-900 shadow-lg'
          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50'
      }`}
    >
      {label}
    </button>
  )
}

const SearchIcon = () => (
  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
)

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)

const ChevronLeft = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ChevronDown = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)
  const [showDropdown, setShowDropdown] = useState(false)

  const filters = ['All', 'On-time', 'Late', 'Absent']

  const filteredEmployees = useMemo(() => {
    let result = employeesData

    // Filter by attendance status
    if (activeFilter !== 'All') {
      result = result.filter(emp => emp.attendance === activeFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(emp =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query) ||
        emp.id.toLowerCase().includes(query)
      )
    }

    return result
  }, [activeFilter, searchQuery])

  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const endIndex = startIndex + recordsPerPage
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleRecordsPerPageChange = (value) => {
    setRecordsPerPage(value)
    setCurrentPage(1)
    setShowDropdown(false)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Card */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {filters.map(filter => (
                  <FilterTab
                    key={filter}
                    label={filter}
                    active={activeFilter === filter}
                    onClick={() => {
                      setActiveFilter(filter)
                      setCurrentPage(1)
                    }}
                  />
                ))}
              </div>

              {/* Search and Filter */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:flex-none">
                  <input
                    type="text"
                    placeholder="Search here..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <SearchIcon />
                  </div>
                </div>
                <button className="p-2.5 bg-slate-700/50 border border-slate-600/50 rounded-xl text-slate-300 hover:bg-slate-600/50 transition-all">
                  <FilterIcon />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Employee name</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Departement</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Attendant</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee, index) => (
                  <tr
                    key={`${employee.id}-${index}`}
                    className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors group"
                  >
                    {/* Employee Name & Avatar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-600/50"
                          />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-800 ${
                            employee.attendance === 'On-time' ? 'bg-emerald-500' :
                            employee.attendance === 'Late' ? 'bg-rose-500' :
                            employee.attendance === 'Absent' ? 'bg-slate-500' : 'bg-cyan-500'
                          }`}></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-100">{employee.name}</p>
                          <p className="text-xs text-slate-500">{employee.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{employee.email}</span>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{employee.department}</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{employee.date}</span>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-300">{employee.type}</span>
                    </td>

                    {/* Attendance Badge */}
                    <td className="px-6 py-4">
                      <AttendanceBadge status={employee.attendance} />
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <EditIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 md:p-6 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Showing info */}
              <p className="text-sm text-slate-400">
                Showing: <span className="text-cyan-400 font-medium">{Math.min(currentEmployees.length, recordsPerPage)}</span> of {filteredEmployees.length} attendance
              </p>

              {/* Page numbers */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft />
                </button>

                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 3) {
                    pageNum = i + 1
                  } else if (currentPage === 1) {
                    pageNum = i + 1
                  } else if (currentPage === totalPages) {
                    pageNum = totalPages - 2 + i
                  } else {
                    pageNum = currentPage - 1 + i
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg bg-slate-700/50 text-slate-400 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Records per page */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">Show 10 record per page</span>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-sm text-slate-300 hover:bg-slate-600/50 transition-all"
                  >
                    {recordsPerPage}
                    <ChevronDown />
                  </button>
                  {showDropdown && (
                    <div className="absolute bottom-full mb-2 right-0 bg-slate-800 border border-slate-600/50 rounded-lg shadow-xl overflow-hidden z-10">
                      {[5, 10, 20, 50].map(value => (
                        <button
                          key={value}
                          onClick={() => handleRecordsPerPageChange(value)}
                          className={`w-full px-4 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors ${
                            recordsPerPage === value ? 'text-cyan-400 bg-slate-700/30' : 'text-slate-300'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App