import { Router } from "express";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

import { updateValidateUserSchema } from "../validators/users.validation.js";
import { validateIdSchema } from "../validators/idSchema.validation.js";

const router = Router();

router.route("/").get(verifyToken, allowedTo("HR"), getAllUsers);

router
    .route("/:id")
    .get(validate(validateIdSchema), verifyToken, getUserById)
    .patch(
        validate(validateIdSchema),
        verifyToken,
        validate(updateValidateUserSchema),
        updateUser
    )
    .delete(verifyToken, allowedTo("HR"), deleteUser);

export default router;
