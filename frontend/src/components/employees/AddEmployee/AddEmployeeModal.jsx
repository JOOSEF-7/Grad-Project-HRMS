import { useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import ModalHeader from '../../UI/Modal/ModalHeader';
import AddEmployeeSteps from './AddEmployeeSteps';
import GeneralStep from './steps/GeneralStep';
import ExperianceStep from './steps/ExperianceStep';
import EmployeeStep from './steps/EmployeeStep';
import PayrollStep from './steps/PayrollStep';
import Button from '../../UI/Button';
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";


const AddEmployeeModal = ({ open, onClose,onSuccess }) => {
  // const [step, setStep] = useState(1);
  const [[step, direction], setStep] = useState([1, 0]);
  const [formData, setFormData] = useState({
    general: {
    image: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
  },
   experience: {
    company: '',
    position: '',
    jobType: '',
    salary: '',
    startDate: '',
    endDate: '',
  },
  employee: {
    jobTitle: '',
    department: '',
    workLocation: '',
    jobType: '',
    joiningDate: '',
    salary: '',
  },
 payroll: {
  method: '',
  bankName: '',
  accountNumber: '',
  Compensation:'',
  }

  });
   const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};
  

const updateGeneral = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    general: {
      ...prev.general,
      [field]: value,
    },
  }));
};
const updateExperience = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    experience: {
      ...prev.experience,
      [field]: value,
    },
  }));
};
const updateEmployee = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    employee: {
      ...prev.employee,
      [field]: value,
    },
  }));
};
const updatePayroll = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    payroll: {
      ...prev.payroll,
      [field]: value,
    },
  }));
};
const handleSubmit = async () => {
  // try {
  //   const employeeData = {
  //     ...formData.general,
  //     ...formData.experience,
  //     ...formData.employee,
  //     ...formData.payroll,
  //   };

  //   const response = await axios.post(
  //     "http://localhost:5000/employees",
  //     employeeData
  //   );
  //   onClose();        // يقفل المودال
  //   onSuccess();      // 👈 نقول للـ parent إن العملية نجحت

  //   console.log(response.data);

  
  // } catch (error) {
  //   console.error(error);
  //   alert("Something went wrong ❌");
  // }
   // ممكن تعملي console log مؤقتًا
  console.log("Form Data:", formData);

  // اقفل المودال
  onClose();

  // بلغ الـ parent إن العملية نجحت
  if (onSuccess) {
    onSuccess();
  }
};




const isStepValid = () => {
  if (step === 1) {
    const { name, email, phone, gender, address } = formData.general;
    return Boolean(name && email && phone && gender && address);
  }
if (step === 2) {
  const { company, position, jobType, salary, startDate, endDate } = formData.experience;
  return Boolean(company && position && jobType && salary && startDate && endDate);
}



  if (step === 3) {
  const { jobTitle, department, workLocation, jobType, joiningDate, salary } = formData.employee;
  return Boolean(jobTitle && department && workLocation && jobType && joiningDate && salary);
}


 if (step === 4) {
  const { method } = formData.payroll;

  if ( !method) return false;

  if (method === "Bank") {
    const { bankName, accountNumber } = formData.payroll;
    if (!bankName || !accountNumber) return false;
  }

  return true;
}


  return false;
};



  return (
  <Modal open={open} onClose={onClose}>
  <ModalHeader title="Add employee" onClose={onClose} />

  <AddEmployeeSteps
    currentStep={step}
    onStepChange={(nextStep) => {
  if (nextStep > step && isStepValid()) {
    setStep(nextStep);
  }
}}

  />


  <div className="flex flex-col h-full">

  {/* Content */}
  {/* <div className="flex-1 px-4"> */}
    <div className="flex-1 px-4 overflow-hidden">
  <AnimatePresence mode="wait" custom={direction}>
    <motion.div
      key={step}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      className=" w-full"
    >
      {step === 1 && (
        <GeneralStep
          data={formData.general}
          onChange={updateGeneral}
        />
      )}

      {step === 2 && (
        <ExperianceStep
          data={formData.experience}
          onChange={updateExperience}
        />
      )}

      {step === 3 && (
        <EmployeeStep
          data={formData.employee}
          onChange={updateEmployee}
        />
      )}

      {step === 4 && (
        <PayrollStep
          data={formData.payroll}
          onChange={updatePayroll}
        />
      )}
    </motion.div>
  </AnimatePresence>
</div>
    {/* {step === 1 && (
      <GeneralStep
        data={formData.general}
        onChange={updateGeneral}
      />
    )}
    {step === 2 && (
   <ExperianceStep
    data={formData.experience}
    onChange={updateExperience}
  />
)}
    {step === 3 && (
  <EmployeeStep
    data={formData.employee}
    onChange={updateEmployee}
  />
)}

  {step === 4 && (
  <PayrollStep
    data={formData.payroll}
    onChange={updatePayroll}
  />
)} */}
 
  {/* </div> */}
  <div className="flex items-center gap-4 px-4 pb-4 pt-3">

  {step > 1 && (
    <button
      type="button"
      // onClick={() => setStep(step - 1)}
      onClick={() => setStep(([prev]) => [prev - 1, -1])}
      className="w-14 h-14 shrink-0 rounded-full border border-gray-500 flex items-center justify-center text-white hover:bg-gray-700 transition"
    >
      ←
    </button>
  )}

  <Button
    type="button"
    disabled={!isStepValid()}
    onClick={() => {
      if (!isStepValid()) return; // أمان زيادة

      if (step === 4) {
        handleSubmit();
      } else {
        // setStep((s) => s + 1);
        setStep(([prev]) => [prev + 1, 1]);
      }
    }}
    className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition
      ${
        !isStepValid()
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600'
      }`}
  >
    {step === 4 ? 'Save Employee' : 'Continue →'}
  </Button>

</div>


</div>


</Modal>

  );
};

export default AddEmployeeModal;
