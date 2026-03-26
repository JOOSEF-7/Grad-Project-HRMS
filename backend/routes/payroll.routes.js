import express from "express";
import {
    generatePayrollDraft,
    ApprovePayroll,
    getEmployeesPayroll,
    getEmployeePayrollById,
    payingOnemonthtoEmployees,
    payingOnemonthtoEmployee,
    payAllPending,
    getMonthlyDashboardStats,
    getYearlyPayrollChart,
} from "../controllers/payroll.controller.js";

import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";

import { generatePayrolSchema } from "../validators/payroll.validation.js";
import {
    validateMonthYearQuery,
    validateYearQuery,
} from "../validators/common.validation.js";

const router = express.Router();

router.post(
    "/draft",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    validate(generatePayrolSchema),
    generatePayrollDraft
);

router.post(
    "/approve",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    validate(generatePayrolSchema),
    ApprovePayroll
);

router.patch(
    "/pay/bulk",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    validate(validateMonthYearQuery),
    payingOnemonthtoEmployees
);

router.patch(
    "/pay/all",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    payAllPending
);

router.patch(
    "/pay/:id",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    payingOnemonthtoEmployee
);

router.get("/", verifyToken, allowedTo("HR", "MANAGER"), getEmployeesPayroll);

router.get(
    "/dashboard/monthly",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    validate(validateMonthYearQuery),
    getMonthlyDashboardStats
);

router.get(
    "/dashboard/yearly",
    verifyToken,
    allowedTo("HR", "MANAGER"),
    validate(validateYearQuery),
    getYearlyPayrollChart
);

router.get(
    "/:id",
    verifyToken,
    allowedTo("HR", "MANAGER", "EMPLOYEE"),
    getEmployeePayrollById
);

export default router;
