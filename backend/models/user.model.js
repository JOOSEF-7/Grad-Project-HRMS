const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRole");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Invalid email"],
        },
        password: { type: String, required: true },
        role: { type: String, enum: [userRoles.HR, userRoles.EMPLOYEE,userRoles.MANAGER], default: userRoles.EMPLOYEE },
        rfidCard: { type: String, unique: true },
        jobTitle: String,
        department: String,
        baseSalary: Number,
        leaveBalance: {
            annual: { type: Number, default: 21 },
            sick: { type: Number, default: 7 },
        },
        status: {
            type: String,
            enum: ["Active", "Archived"],
            default: "Active",
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;