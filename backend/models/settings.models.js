import mongoose from "mongoose";
import { modelConfig } from "../utils/modelConfig.js";

const settingsSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        companyLogo: {
            type: String,
            required: true,
        },
        companyEmail: {
            type: String,
            required: true,
        },
        timeZone: {
            type: String,
            default: "Africa/Cairo",
        },
        workStartTime: {
            type: String,
            default: "08:00",
        },
        weekEnds: {
            type: [Number],
            default: [5, 6],
        },
        holidays: {
            type: [String],
            default: [],
        },
    },
    modelConfig
);

const Setting = mongoose.model("Setting", settingsSchema);
export default Setting;
