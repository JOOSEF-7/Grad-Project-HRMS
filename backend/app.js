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
import appErrors from "./utils/errors.js";

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
    .then(() => {
        console.log("connected successfully to the database");
        app.listen(port, () => {
            console.log(`listening on the port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed");
        console.error(err.message);
        process.exit(1);
    });
