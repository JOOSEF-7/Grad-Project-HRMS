import express from "express";
const router = express.Router();

import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import userRoles from "../utils/userRole.js";
import { validate } from "../Middleware/validate.Middelware.js";

import {
    validateApplicantStatisticsSchema,
    validateProjectSummarySchema,
    validateDashboardStatisticsSchema,
    validateEmployeeStatusSchema,
} from "../validators/dashboard.validation.js";

import {
    getDashboardStatistics,
    getApplicantsByStatus,
    getEmployeeStatus,
    getProjectSummary,
} from "../controllers/dashboard.controller.js";

router
    .route("/dashboard-statistics")
    .get(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(validateDashboardStatisticsSchema),
        getDashboardStatistics
    );

router
    .route("/applicants-by-status")
    .get(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(validateApplicantStatisticsSchema),
        getApplicantsByStatus
    );

router
    .route("/employee-status")
    .get(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(validateEmployeeStatusSchema),
        getEmployeeStatus
    );

router
    .route("/project-summary")
    .get(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(validateProjectSummarySchema),
        getProjectSummary
    );

export default router;
