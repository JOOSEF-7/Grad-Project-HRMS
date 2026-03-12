import { Router } from "express";
import {
    checkIn,
    getAllAttendence,
    getMonthlyAttendenceStats,
    getWeeklyAttendenceStats,
} from "../controllers/attendence.controller.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    monthlyStatsSchema,
    validateCheckInSchema,
    weeklyStatsSchema,
} from "../validators/attendance.valiation.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { get } from "mongoose";

const router = Router();
router.route("/").get(verifyToken, allowedTo("HR"), getAllAttendence);
router.route("/check-in").post(validate(validateCheckInSchema), checkIn);
router
    .route("/stats/monthly")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(monthlyStatsSchema),
        getMonthlyAttendenceStats
    );
router
    .route("/stats/weekly")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(weeklyStatsSchema),
        getWeeklyAttendenceStats
    );

export default router;
