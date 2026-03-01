const mongoose = require("mongoose");
const taskPeriority = require("../utils/taskPeriority");

const taskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    priority: { type: String, enum: [taskPeriority.LOW, taskPeriority.MEDIUM, taskPeriority.HIGH] },
    deadline: Date,
    status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
    },
});
