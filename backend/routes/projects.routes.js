import express from "express";
const router = express.Router();
import {
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
    createProject,
} from "../controllers/project.controller.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    validateProjectSchema,
    updateValidateProjectSchema,
} from "../validators/project.validation.js";
import { setFilesToBody } from "../Middleware/setFilesToBody.js";
import upload from "../Middleware/multerConfig.js";
import { getProjectStats } from "../controllers/projectStatus.controller.js";

router
    .route("/")
    .get(verifyToken, getAllProjects)
    .post(
        verifyToken,
        allowedTo("HR", "MANAGER"),
        upload.fields([
            { name: "general[avatar]", maxCount: 1 },
            { name: "documents", maxCount: 10 },
        ]),
        setFilesToBody({
            "general[avatar]": "general.avatar",
            documents: "documents",
        }),
        validate(validateProjectSchema),
        createProject
    );

router.route("/stats").get(verifyToken, getProjectStats);

router
    .route("/:id")
    .get(verifyToken, getProjectById)
    .patch(
        verifyToken,
        allowedTo("HR", "MANAGER"),
        validate(updateValidateProjectSchema),
        updateProject
    )
    .delete(verifyToken, allowedTo("HR", "MANAGER"), deleteProject);

export default router;
