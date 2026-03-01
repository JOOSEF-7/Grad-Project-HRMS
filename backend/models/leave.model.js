const mongoose = require("mongoose");
const leaveTypes = require("../utils/leaveTypes");

const leaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: [leaveTypes.ANNUAL, leaveTypes.SICK, leaveTypes.UNPAID] },
    startDate: Date,
    endDate: Date,
    reason: String,
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
