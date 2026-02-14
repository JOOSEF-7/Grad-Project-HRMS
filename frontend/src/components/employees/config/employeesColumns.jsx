import StatusBadge from '../../UI/StatusBadge'

export const employeesColumns = [
  {
    header: 'Employee',
    accessor: 'name',
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Department',
    accessor: 'department',
  },
  {
    header: 'Type',
    accessor: 'type',
  },
  {
    header: 'Attendance',
    accessor: 'attendance',
    cell: (value) => <StatusBadge status={value} />,
  },
];
