import { Router } from "express";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchEmployees,
} from "../controllers/user.controller.js";

import { updateValidateUserSchema, searchEmployeesSchema } from "../validators/users.validation.js";
import { validateIdSchema } from "../validators/idSchema.validation.js";
import upload from "../Middleware/multerConfig.js";
import { processUploadedFile } from "../Middleware/processUploads.js";
import { setFilesToBody } from "../Middleware/setFilesToBody.js";

const router = Router();

router.route("/").get(verifyToken, allowedTo("HR"), getAllUsers);

router
    .route("/:id")
    .get(validate(validateIdSchema), verifyToken, getUserById)
    .patch(
        upload.fields([{ name: "general[avatar]", maxCount: 1 }]),
        processUploadedFile,
        setFilesToBody({ "general[avatar]": "general.avatar" }),
        validate(validateIdSchema),
        verifyToken,
        validate(updateValidateUserSchema),
        updateUser
    )
    .delete(verifyToken, allowedTo("HR"), deleteUser);

router.route("/search").get(verifyToken, allowedTo("HR"), validate(searchEmployeesSchema), searchEmployees);
export default router;
