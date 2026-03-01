import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: [String],
        status: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
        },
        date: { type: Date, default: Date.now },
    },
    modelConfig
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
