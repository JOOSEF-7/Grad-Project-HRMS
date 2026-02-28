import { z } from "zod";
import appErrors from "../utils/errors.js";
import { SUCCESS, FAIL, ERROR } from "../utils/httpResponseText.js";
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path[1],
          message: issue.message,
        }));
        console.log(errorMessages);
        const newError = appErrors.create(400, errorMessages, FAIL);
        return next(newError);
      }
      next(error);
    }
  };
};
