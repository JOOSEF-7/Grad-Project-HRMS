import jwt from "jsonwebtoken";
import appErrors from "../utils/errors.js";
import { httpResponseText } from "../utils/httpResponseText.js";

export const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        const error = appErrors.create(
            401,
            "accessToken is required ",
            httpResponseText.FAIL
        );
        return next(error);
    }
    try {
        const decodedToken = jwt.verify(
            accessToken,
            process.env.JWT_SECRET_KEY
        );
        req.currentUser = decodedToken;
        next();
    } catch {
        const error = appErrors.create(
            401,
            "invalid accessToken !! ",
            httpResponseText.FAIL
        );
        return next(error);
    }
};
