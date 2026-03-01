import appErrors from "../utils/errors.js";

export const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const error = appErrors.create(403, "user not authorized", "Fail");
      return next(error);
    }
    next();
  };
};
