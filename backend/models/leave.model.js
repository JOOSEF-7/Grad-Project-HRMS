import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig";

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["Sick", "Annual", "Unpaid"] },
    startDate: Date,
    endDate: Date,
    reason: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  modelConfig
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
