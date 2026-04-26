import express from "express";
const router = express.Router();

import { validate } from "../Middleware/validate.Middelware.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import userRoles from "../utils/userRole.js";

import {
    validateApplicantSchema,
    validateUpdateApplicantSchema,
    validateHiringApplicantsListSchema,
    searchApplicantsSchema,
} from "../validators/applicant.validation.js";

import {
    getAllApplicants,
    getApplicantById,
    getApplicantsByJobId,
    createApplicant,
    updateApplicant,
    deleteApplicant,
    getHiringStatistics,
    getHiringApplicantsList,
    searchApplicants,
} from "../controllers/applicant.controller.js";

router.route("/").get(verifyToken, allowedTo(userRoles.HR), getAllApplicants);

router
    .route("/hiring-statistics")
    .get(verifyToken, allowedTo(userRoles.HR), getHiringStatistics);

router
    .route("/hiring-applicants-list")
    .get(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(validateHiringApplicantsListSchema),
        getHiringApplicantsList
    );

router
    .route("/search")
    .get(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(searchApplicantsSchema),
        searchApplicants
    );

router
    .route("/:jobId")
    .post(validate(validateApplicantSchema), createApplicant);

router
    .route("/job/:jobId")
    .get(verifyToken, allowedTo(userRoles.HR), getApplicantsByJobId);

router
    .route("/:id")
    .get(verifyToken, allowedTo(userRoles.HR), getApplicantById)
    .patch(
        verifyToken,
        allowedTo(userRoles.HR),
        validate(validateUpdateApplicantSchema),
        updateApplicant
    )
    .delete(verifyToken, allowedTo(userRoles.HR), deleteApplicant);

export default router;
