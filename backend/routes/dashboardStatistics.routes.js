import express from "express";
const router = express.Router();

import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import userRoles from "../utils/userRole.js";
import { validate } from "../Middleware/validate.Middelware.js";


import { 
    validateEmployeeStatisticsSchema, 
    validateApplicantStatisticsSchema, 
    validatePayrollStatisticsSchema, 
    validateProjectSummarySchema 
} from "../validators/dashboardStatistics.validation.js";

import { 
    getEmployeeStatistics, 
    getApplicantStatistics, 
    payrollStatistics, 
    getEmployeeStatus, 
    getProjectSummary 
} from "../controllers/dashboardStatistics.controller.js";

router.route("/employee-statistics")
.get(
    verifyToken, 
    allowedTo(userRoles.HR), 
    validate(validateEmployeeStatisticsSchema), 
    getEmployeeStatistics
);

router.route("/applicant-statistics")
.get(
        verifyToken, 
        allowedTo(userRoles.HR), 
        validate(validateApplicantStatisticsSchema),
        getApplicantStatistics
    );

router.route("/payroll-statistics")
    .get(verifyToken, allowedTo(userRoles.HR), validate(validatePayrollStatisticsSchema), payrollStatistics);

router.route("/employee-status")
    .get(verifyToken, allowedTo(userRoles.HR), getEmployeeStatus);

router.route("/project-summary")
    .get(verifyToken, allowedTo(userRoles.HR), validate(validateProjectSummarySchema), getProjectSummary);

export default router;