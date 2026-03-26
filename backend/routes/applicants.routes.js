import express from "express";
const router = express.Router();
import { validate } from "../Middleware/validate.Middelware.js";
import { validateApplicantSchema,validateUpdateApplicantSchema } from "../validators/applicant.validation.js";

import { 
    getAllApplicants, 
    getApplicantById, 
    getApplicantsByJobId, 
    createApplicant, 
    updateApplicant, 
    deleteApplicant 
} from "../controllers/applicant.controller.js";

import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import userRoles from "../utils/userRole.js";

router.route("/")
    .get(verifyToken, allowedTo(userRoles.HR), getAllApplicants);


router.route("/:jobId")
    .post(validate(validateApplicantSchema),createApplicant);

router.route("/job/:jobId")
    .get(verifyToken, allowedTo(userRoles.HR), getApplicantsByJobId);

router.route("/:id")
    .get(verifyToken, allowedTo(userRoles.HR), getApplicantById)
    .patch(verifyToken, allowedTo(userRoles.HR), validate(validateUpdateApplicantSchema), updateApplicant)
    .delete(verifyToken, allowedTo(userRoles.HR), deleteApplicant);

export default router;