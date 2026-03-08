import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig.js";
import { string } from "zod";
import validator from "validator";

const attendanceSchema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: String, required: true },
        checkIn: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["On Time", "Absent", "Late"],
            default: "Absent",
        },
    },
    modelConfig
);
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });
const Attendance = mongoose.model("Attendance", attendanceSchema, "attendance");
export default Attendance;
