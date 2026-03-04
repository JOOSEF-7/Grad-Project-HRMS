function PayrollHeader() {
  return (
    <div className="flex justify-between items-center mb-4 bg-transparent p-4 rounded-2xl">

        {/* Title */}
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Payroll
        </h1>
        <div className="flex items-center gap-3 relative">
         {/* Calender button */}
         {/* <ReusableCalendar 
          mode="single" 
          value={appliedDate} 
          onSave={handleDateSave} 
        /> */}
   
      </div>
      
      </div>

    
  )
}


export default PayrollHeader;