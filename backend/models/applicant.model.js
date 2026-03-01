const mongoose = require("mongoose");
const applicantStatus = require("../utils/applicantStatus");

const applicantSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    name: String,
    email: String,
    cvUrl: String,
    experience: Number,
    status: {
        type: String,
        enum: [applicantStatus.APPLIED, applicantStatus.INTERVIEWING, applicantStatus.HIRED, applicantStatus.REJECTED],
        default: applicantStatus.APPLIED,
    },
});

const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports = Applicant;