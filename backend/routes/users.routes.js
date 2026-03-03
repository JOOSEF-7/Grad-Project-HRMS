import { Router } from "express";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import { loginLimiter } from "../Middleware/rateLimiting.js";
import {
    validateUserSchema,
    updateValidateUserSchema,
    validateLogInSchema,
    forgetPasswordSchema,
    verifyResetCodeSchema,
    resetPasswordSchema,
} from "../validators/users.validation.js";
import upload from "../Middleware/multerConfig.js";
import { setAvatarToBody } from "../Middleware/setAvatarToBody.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";
import {
    forgetPassword,
    login,
    logout,
    refreshUserToken,
    register,
    resetPassword,
    verifyResetCode,
} from "../controllers/auth.controller.js";
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

router
    .route("/register")
    .post(
        upload.single("avatar"),
        setAvatarToBody,
        validate(validateUserSchema),
        register
    );

router.route("/login").post(validate(validateLogInSchema), loginLimiter, login);

router.route("/logout").post(verifyToken, logout);

router.route("/refresh").post(refreshUserToken);

router
    .route("/forget-Password")
    .post(validate(forgetPasswordSchema), forgetPassword);

router
    .route("/verify-reset-code")
    .post(validate(verifyResetCodeSchema), verifyResetCode);
router
    .route("/reset-password")
    .post(validate(resetPasswordSchema), resetPassword);

export default router;
