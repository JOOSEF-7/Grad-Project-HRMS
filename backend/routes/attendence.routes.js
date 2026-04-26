import { Router } from "express";
import {
    checkIn,
    getAllAttandence,
    getAttendanceByEmployeeId,
    getMonthlyAttendanceStats,
    getSixMonthsAttendanceStats,
    getWeeklyAttendanceStats,
    searchAttendance,
} from "../controllers/attendance.controller.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    AttendanceByEmployeeIdQuery,
    getAllAttendanceQuerySchema,
    monthlyStatsSchema,
    validateCheckInSchema,
    weeklyStatsSchema,
} from "../validators/attendance.validation.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { dailySearchSchema } from "../validators/common.validation.js";

const router = Router();

router
    .route("/")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(getAllAttendanceQuerySchema),
        getAllAttandence
    );
router.get("/search", validate(dailySearchSchema), searchAttendance);

router
    .route("/employee/:id")
    .get(
        verifyToken,
        validate(AttendanceByEmployeeIdQuery),
        getAttendanceByEmployeeId
    );

router.route("/check-in").post(validate(validateCheckInSchema), checkIn);

router
    .route("/stats/six-months")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(monthlyStatsSchema),
        getSixMonthsAttendanceStats
    );
router
    .route("/stats/weekly")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(weeklyStatsSchema),
        getWeeklyAttendanceStats
    );

router
    .route("/stats/monthly")
    .get(
        verifyToken,
        allowedTo("HR"),
        validate(monthlyStatsSchema),
        getMonthlyAttendanceStats
    );

export default router;
