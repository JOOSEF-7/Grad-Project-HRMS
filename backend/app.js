import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import fs from "fs";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import appErrors from "./utils/errors.js";
import projectRouter from "./routes/projects.routes.js";
import taskRouter from "./routes/tasks.routes.js";
import leaveRouter from "./routes/leaves.routes.js";
import attendanceRoutes from "./routes/attendence.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import payrollRouter from "./routes/payroll.routes.js";
import scheduleAttendanceJob from "./jobs/attendanceJob.js";
import jobRouter from "./routes/jobs.routes.js";
import applicantRouter from "./routes/applicants.routes.js";
import scheduleresetDefaultLeaves from "./jobs/resetDefaultLeaves.js";
import dashboardRouter from "./routes/dashboard.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "logs", "access.log"),
    { flags: "a" }
);

app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applicants", applicantRouter);
app.use("/api/leaves", leaveRouter);
app.use("/api/payroll", payrollRouter);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/dashboard", dashboardRouter);

app.all(/(.*)/, (req, res, next) => {
    const error = appErrors.create(404, "the route is not handeld", "Fail");
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || "FAIL",
        message: error.message,
        code: error.statusCode || 500,
        data: null,
    });
});

const url = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose
    .connect(url)
    .then(async () => {
        console.log("connected successfully to the database");
        await scheduleAttendanceJob();
        await scheduleresetDefaultLeaves();

        app.listen(port, () => {
            console.log(`listening on the port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed");
        console.error(err.message);
        process.exit(1);
    });
