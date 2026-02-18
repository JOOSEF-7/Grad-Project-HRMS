import { useState } from "react"
import AddEmployeeModal from "../AddEmployee/AddEmployeeModal"
import SuccessCard from "../AddEmployee/SuccessCard"

const EmployeeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-8 bg-transparent p-4 rounded-2xl">

        {/* Title */}
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Employees
        </h1>

        {/* Add Employee Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0095ff] hover:bg-[#0081dd] text-white px-6 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-all active:scale-95"
        >
          <i className="fas fa-plus text-sm"></i>
          <span> Add Employee </span>
        </button>
      </div>

      {/* Modal */}
      <AddEmployeeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false)
          setIsSuccess(true)
        }}
      />

      {/* Success Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <SuccessCard onDone={() => setIsSuccess(false)} />
        </div>
      )}
    </>
  )
}

export default EmployeeHeader
