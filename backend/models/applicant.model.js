import mongoose from "mongoose";
import validator from "validator";
import { modelConfig } from "../utils/modelConfig";

const applicantSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },

        firstName: {
            type: String,
            required: true,
            minLength: [3, "the minimum number of chracter is 3"],
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "the minimum number of chracter is 3"],
        },
        gender: { type: String, enum: ["Male", "Female"] },
        phone: {
            type: String,
            required: true,
            minLength: [6, "the phone number must be at least 6 numbes long"],
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Invalid email"],
        },
        resumeLink: String,
        experience: { type: Number, required: true },
        status: {
            type: String,
            enum: ["Applied", "Interviewing", "Hired", "Rejected"],
            default: "Applied",
        },
        avatar: {
            type: String,
            default: "/uploads/default-avatar.png",
        },
    },
    modelConfig
);

const Applicant = mongoose.model("Applicant", applicantSchema);
export default Applicant;
