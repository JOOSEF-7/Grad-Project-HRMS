const mongoose = require("mongoose");
const attendanceStatus = require("../utils/attendanceStatus");

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now },
    checkIn: Date,
    checkOut: Date,
    status: {
        type: String,
        enum: [attendanceStatus.PRESENT, attendanceStatus.LATE, attendanceStatus.ABSENT],
        default: attendanceStatus.PRESENT,
    },
    totalHours: Number,
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;