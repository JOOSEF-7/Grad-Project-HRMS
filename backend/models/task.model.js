import { modelConfig } from "../utils/modelConfig";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
        assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
        },
        deadline: Date,
        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending",
        },
    },
    modelConfig
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
