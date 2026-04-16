import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig.js";

const requestSchema = new mongoose.Schema(
    {
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Employee reference is required"],
        },
        type: {
            type: String,
            enum: ["Vacation", "Permission", "Salary Increase", "Complaint", "Equipment"],
            required: [true, "Request type is required"],
        },
        status: {
            type: String,
            enum: ["Pending", "Approved", "Rejected"],
            default: "Pending",
        },
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minLength: [10, "Description must be at least 10 characters long"],
        },
        attachmentUrl: {
            type: String,
            default: null,
        },
        startDate: {
            type: Date,
            required: function () {
                return this.type === "Vacation" || this.type === "Permission";
            },
        },
        endDate: {
            type: Date,
            required: function () {
                return this.type === "Vacation";
            },
        },
    },
    modelConfig
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
