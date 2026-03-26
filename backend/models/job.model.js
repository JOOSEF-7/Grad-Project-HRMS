import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig.js";
const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: { type: [String], required: true },
        status: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
        },
        date: { type: Date, default: Date.now },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    modelConfig
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
