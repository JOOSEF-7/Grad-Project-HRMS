import { Router } from "express";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    createLeave,
    deleteLeave,
    getAllLeaves,
    getLeaveById,
    getUserLeavesById,
    updateLeave,
    updateLeaveStatus,
} from "../controllers/leave.controller.js";
import {
    validateLeaveSchema,
    validateLeaveStatusSchema,
    validateUpdateLeaveSchema,
} from "../validators/leave.validation.js";
import upload from "../Middleware/multerConfig.js";
import { setFilesToBody } from "../Middleware/setFilesToBody.js";
import { validateIdSchema } from "../validators/idSchema.validation.js";

const router = Router();

router.route("/").get(verifyToken, allowedTo("HR"), getAllLeaves);

router
    .route("/employee/:id")
    .get(verifyToken, validate(validateIdSchema), getUserLeavesById);

router.route("/:id").get(verifyToken, validate(validateIdSchema), getLeaveById);

router
    .route("/create")
    .post(
        verifyToken,
        allowedTo("EMPLOYEE"),
        upload.fields([{ name: "attachment", maxCount: 1 }]),
        setFilesToBody({ attachment: "attachment" }),
        validate(validateLeaveSchema),
        createLeave
    );

router
    .route("/:id")
    .patch(
        verifyToken,
        allowedTo("EMPLOYEE"),
        upload.fields([{ name: "attachment", maxCount: 1 }]),
        setFilesToBody({ attachment: "attachment" }),
        validate(validateIdSchema),
        validate(validateUpdateLeaveSchema),
        updateLeave
    );

router
    .route("/:id/status")
    .patch(
        verifyToken,
        allowedTo("HR"),
        validate(validateIdSchema),
        validate(validateLeaveStatusSchema),
        updateLeaveStatus
    );

router
    .route("/:id")
    .delete(
        verifyToken,
        allowedTo("EMPLOYEE"),
        validate(validateIdSchema),
        deleteLeave
    );

export default router;
