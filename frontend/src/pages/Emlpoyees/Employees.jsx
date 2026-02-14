import { useEffect, useState } from "react";
import EmployeesTable from '../../components/employees/EmployeesTable';
import AddEmployeeForm from "../../components/employees/forms/AddEmployeeForm";
import AddEmployeeModal from '../../components/employees/AddEmployee/AddEmployeeModal';
import SuccessCard from "../../components/employees/AddEmployee/SuccessCard";


const Employees = () => {
   const [employees, setEmployees] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);


  const handleAddEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  return (
    <>
      <AddEmployeeForm onSuccess={handleAddEmployee} />
      <EmployeesTable data={employees} />
        <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
        Add employee
      </button>

      <AddEmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsSuccess(true)}
      />  
      {isSuccess && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <SuccessCard
      onDone={() => setIsSuccess(false)}
      />
      </div>
    )}

    </>
  );
};

export default Employees;


