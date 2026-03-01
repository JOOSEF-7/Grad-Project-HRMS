import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig";
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    startDate: { type: Date, default: Date.now },
    deadline: Date,
    status: {
      type: String,
      enum: ["Completed", "Active", "On-Hold"],
      default: "On-Hold",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  modelConfig
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
