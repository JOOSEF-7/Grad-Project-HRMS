import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "the first name is required !!"],
      minLength: [2, "the minimun number of chracter is 2 "],
    },
    lastName: {
      type: String,
      required: [true, "the last name is required !!"],
      minLength: [2, "the minimun number of chracter is 2 "],
    },
    email: {
      type: String,
      required: [true, "the email is required !!"],
      unique: true,
      validate: [isEmail, "must be email"],
    },
    password: {
      type: String,
      required: [true, "the password is required !!"],
      minLength: [6, "the password must be at least 6 charcter "],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "MANAGER"],
      default: "USER",
    },
    avatar: {
      type: String,
      default: "uploads/image.png",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
