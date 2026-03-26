import { Router } from "express";
import {
    checkIn,
    getAllAttandence,
    getAttendanceByEmployeeId,
    getMonthlyAttendanceStats,
    getWeeklyAttendanceStats,
} from "../controllers/attendance.controller.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    monthlyStatsSchema,
    validateCheckInSchema,
    weeklyStatsSchema,
} from "../validators/attendance.valiation.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";

const router = Router();

router.route("/").get(verifyToken, allowedTo("HR"), getAllAttandence);

router.route("/employee/:id").get(verifyToken, getAttendanceByEmployeeId);

router.route("/check-in").post(validate(validateCheckInSchema), checkIn);

router
    .route("/stats/monthly")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(monthlyStatsSchema),
        getMonthlyAttendanceStats
    );
router
    .route("/stats/weekly")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(weeklyStatsSchema),
        getWeeklyAttendanceStats
    );

export default router;
