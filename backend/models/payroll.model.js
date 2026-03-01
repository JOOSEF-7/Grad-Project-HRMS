import mongoose from "mongoose";

const payrollSchema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        month: { type: Number, required: true },
        year: { type: Number, required: true },
        baseSalary: { type: Number, required: true },
        netSalary: { type: Number, required: true },
        deductions: { type: Number, required: true },
        daysPresent: { type: Number, required: true },
        daysAbsentt: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Paid", "Unpaid", "Pending"],
            default: "Pending",
        },
    },
    modelConfig
);

const Payroll = mongoose.model("Payroll", payrollSchema);
export default Payroll;
