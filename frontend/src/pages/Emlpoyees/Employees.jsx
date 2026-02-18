import { useEffect, useState } from "react";
import EmployeesTable from '../../components/employees/EmployeesTable';
import EmployeeHeader from "../../components/employees/EmployeeHeader/EmployeeHeader";
import AddEmployeeModal from '../../components/employees/AddEmployee/AddEmployeeModal';
import SuccessCard from "../../components/employees/AddEmployee/SuccessCard";


const Employees = () => {

  
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);




  return (
    <>
      <EmployeeHeader/>
     
      <EmployeesTable />
 

    </>
  );
};

export default Employees;


