import { Router } from "express";
import multer from "multer";

import { verifyToken } from "../guards/verifyToken.js";
import { validate } from "../Middleware/validate.Middelware.js";
import appErrors from "../utils/errors.js";

import {
  validateUserSchema,
  validateLogInSchema,
} from "../validators/users.validation.js";

import {
  getAllUsers,
  login,
  refreshUserToken,
  register,
} from "../controllers/users.controller.js";
import { setAvatarToBody } from "../Middleware/setAvatarToBody.js";
import { loginLimiter } from "../Middleware/rateLimiting.js";
import upload from "../Middleware/multerConfig.js";

const router = Router();

router.route("/").get(verifyToken, getAllUsers);

router
  .route("/register")
  .post(
    upload.single("avatar"),
    setAvatarToBody,
    validate(validateUserSchema),
    register,
  );

router.route("/login").post(validate(validateLogInSchema), loginLimiter, login);
router.route("/refresh").post(refreshUserToken);

export default router;
