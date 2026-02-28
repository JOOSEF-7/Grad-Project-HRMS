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

const router = Router();

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-image${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const inputType = file.mimetype.split("/")[0];
  if (inputType === "image") {
    return cb(null, true);
  } else {
    return cb(
      appErrors.create(400, "the file must be an image", "Fail"),
      false,
    );
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

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
