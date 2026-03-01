const mongoose = require("mongoose");
const jopStatus = require("../utils/jopStatus");

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    requirements: [String],
    status: { type: String, enum: [jopStatus.OPEN, jopStatus.CLOSED], default: jopStatus.OPEN },
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;