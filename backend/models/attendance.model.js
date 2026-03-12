import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig.js";

const attendanceSchema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
            checkIn: {
                type: Date,
                required: true,
            },
        // checkOut: Date,
        status: {
            type: String,
            enum: ["Present", "Absent", "Late"],
            default: "Absent",
        },
        // totalHours: {
        //     type: Number,
        //     default: 0,
        // },
    },
    modelConfig
);

const Attendance = mongoose.model("Attendance", attendanceSchema, "attendance");
export default Attendance;
