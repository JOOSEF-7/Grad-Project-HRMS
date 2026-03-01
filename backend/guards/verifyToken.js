import jwt from "jsonwebtoken";
import appErrors from "../utils/errors.js";

export const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appErrors.create(401, "accessToken is required ", "Fail");
    return next(error);
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    const error = appErrors.create(401, "accessToken is required !! ", "Fail");
    return next(error);
  }
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.currentUser = decodedToken;
    next();
  } catch {
    const error = appErrors.create(401, "invalid accessToken !! ", "Fail");
    return next(error);
  }
};
