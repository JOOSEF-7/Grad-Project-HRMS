import { Router } from "express";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import { validateUserSchema, updateValidateUserSchema } from "../validators/users.validation.js";
import upload from "../Middleware/multerConfig.js";
import { setAvatarToBody } from "../Middleware/setAvatarToBody.js";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

// router
//     .route("/")
//     .get(
//         verifyToken,
//         allowedTo("HR", "EMPLOYEE", "MANAGER"),
//         asyncWraper(getAllUsers)
//     )
//     .post(
//         verifyToken,
//         allowedTo("HR", "MANAGER"),
//         upload.single("avatar"),
//         setAvatarToBody,
//         validate(validateUserSchema),
//         asyncWraper(createUser)
//     );

// router
//     .route("/:id")
//     .get(
//         verifyToken,
//         allowedTo("HR", "EMPLOYEE", "MANAGER"),
//         asyncWraper(getUserById)
//     )
//     .patch(
//         verifyToken,
//         allowedTo("HR", "EMPLOYEE", "MANAGER"),
//         validate(validateUserSchema),
//         asyncWraper(updateUser)
//     )
//     .delete(verifyToken, allowedTo("HR", "MANAGER"), asyncWraper(deleteUser));

router
    .route("/")
    .get(asyncWraper(getAllUsers))
    .post(
        upload.single("avatar"),
        setAvatarToBody,
        validate(validateUserSchema),
        asyncWraper(createUser)
    );

router
    .route("/:id")
    .get(asyncWraper(getUserById))
    .patch(validate(updateValidateUserSchema), asyncWraper(updateUser))
    .delete(asyncWraper(deleteUser));

export default router;
