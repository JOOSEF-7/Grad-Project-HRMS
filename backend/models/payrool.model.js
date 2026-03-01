const mongoose = require("mongoose");
const payroolStatus = require("../utils/payrollStatus");

const payrollSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    month: Number,
    year: Number,
    netSalary: Number,
    deductions: Number,
    bonuses: { type: Number, default: 0 },
    status: { type: String, enum: [payroolStatus.PAID, payroolStatus.PENDING], default: payroolStatus.PENDING },
});

const Payroll = mongoose.model("Payroll", payrollSchema);
module.exports = Payroll;
