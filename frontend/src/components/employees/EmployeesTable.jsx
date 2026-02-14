import DataTable from '../table/DataTable';
import { employeesColumns } from './config/employeesColumns';

const EmployeesTable = ({ data }) => {
  return <DataTable columns={employeesColumns} data={data} />;
};

export default EmployeesTable;
