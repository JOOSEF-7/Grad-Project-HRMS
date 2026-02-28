import {
  addNewCourse,
  deleteCourse,
  getAllCourses,
  getSpecificCourse,
  updateCourse,
} from "../controllers/courses.controller.js";

import { Router } from "express";
import { verifyToken } from "../guards/verifyToken.js";
import { allowedTo } from "../guards/allowedTo.js";
import { validate } from "../Middleware/validate.Middelware.js";
import {
  updateCourseScheme,
  validateCourseScheme,
  validateIdSchema,
} from "../validators/courses.validation.js";
const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    verifyToken,
    allowedTo("ADMIN", "MANGER"),
    validate(validateCourseScheme),
    addNewCourse,
  );

router
  .route("/:id")
  .get(validate(validateIdSchema), getSpecificCourse)
  .patch(
    verifyToken,
    allowedTo("ADMIN", "MANGER"),
    validate(updateCourseScheme),
    validate(validateIdSchema),
    updateCourse,
  )
  .delete(verifyToken, allowedTo("ADMIN", "MANGER"), deleteCourse);

export default router;
