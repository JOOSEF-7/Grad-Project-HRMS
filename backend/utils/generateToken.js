import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "7h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
    return { accessToken, refreshToken };
};
