import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig";
import { _isoDuration } from "zod/v4/core";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["Sick", "Annual", "Unpaid"] },
    startDate: Date,
    endDate: Date,
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    duration: { type: String, required: true },
    hrId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  },
  modelConfig
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
