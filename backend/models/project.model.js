const mongoose = require("mongoose");
const projectStatus = require("../utils/projectStatus");
const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        startDate: { type: Date, default: Date.now },
        deadline: Date,
        status: {
            type: String,
            enum: [projectStatus.ACTIVE, projectStatus.COMPLETED, projectStatus.ON_HOLD],
            default: projectStatus.ACTIVE,
        },
        team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
