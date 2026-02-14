const StatusBadge = ({ status }) => {
  const statusMap = {
    'On Time': 'green',
    Late: 'orange',
    Absent: 'red',
  };

  return (
    <span className={`badge badge-${statusMap[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
