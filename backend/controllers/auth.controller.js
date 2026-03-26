import { httpResponseText } from "../utils/httpResponseText.js";
import User from "../models/user.model.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import appErrors from "../utils/errors.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

export const register = asyncWraper(async (req, res, next) => {
    const { general, experience, employee } = req.body;
    const oldUser = await User.findOne({ "general.email": general.email });

    if (oldUser) {
        const error = appErrors.create(
            400,
            "User Already Exists",
            httpResponseText.FAIL
        );
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(general.password, 10);
    general.password = hashedPassword;

    const newUser = new User({ general, experience, employee });

    await newUser.save();

    newUser.general.password = undefined;
    newUser.__v = undefined;
    newUser.general.passwordResetCode = undefined;
    newUser.general.passwordResetExpires = undefined;
    newUser.general.passwordResetVerified = undefined;

    res.status(201).json({
        status: httpResponseText.SUCCESS,
        data: { newUser },
    });
});

export const login = asyncWraper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = appErrors.create(
            400,
            "the email and password required",
            "Fail"
        );
        return next(error);
    }
    const oldUser = await User.findOne({ "general.email": email });
    if (!oldUser) {
        const error = appErrors.create(
            400,
            "Invalid email or password",
            "Fail"
        );
        return next(error);
    }
    const isMatchedPass = await bcrypt.compare(
        password,
        oldUser.general.password
    );
    if (!isMatchedPass) {
        const error = appErrors.create(
            400,
            "Invalid email or password",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const { accessToken, refreshToken } = generateToken({
        email: oldUser.general.email,
        userId: oldUser._id,
        role: oldUser.general.role,
    });
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    oldUser.general.password = undefined;
    oldUser.__v = undefined;
    oldUser.general.passwordResetCode = undefined;
    oldUser.general.passwordResetExpires = undefined;
    oldUser.general.passwordResetVerified = undefined;
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        message: "successfully login",
        data: {
            user: oldUser,
            accessToken,
        },
    });
});

export const refreshUserToken = asyncWraper(async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        const error = appErrors.create(401, "you must log in", FAIL);
        return next(error);
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
        const payload = {
            email: decoded.email,
            userId: decoded.userId,
            role: decoded.role,
        };
        const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 60 * 60 * 1000,
        });
        res.status(200).json({
            status: httpResponseText.SUCCESS,
            data: { accessToken: newAccessToken },
        });
    } catch (err) {
        return next(
            appErrors.create(401, "Invalid or expired refreshtoken", ERROR)
        );
    }
});

export const logout = asyncWraper(async (req, res, next) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    };
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        message: "logout successfully",
    });
});

export const forgetPassword = asyncWraper(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        const error = appErrors.create(400, "email is required", FAIL);
        return next(error);
    }
    const oldUser = await User.findOne({ "general.email": email });
    if (!oldUser) {
        const error = appErrors.create(404, "user not found", FAIL);
        return next(error);
    }
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedResetCode = crypto
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");

    oldUser.general.passwordResetCode = hashedResetCode;
    oldUser.general.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    oldUser.general.passwordResetVerified = false;
    await oldUser.save();

    try {
        await sendEmail({
            email: oldUser.general.email,
            subject: "Password Reset OTP",
            message: `Your OTP code for password reset is: ${resetCode}`,
        });
        res.status(200).json({
            status: httpResponseText.SUCCESS,
            message: "OTP code sent to your email",
        });
    } catch (err) {
        oldUser.general.passwordResetCode = null;
        oldUser.general.passwordResetExpires = null;
        await oldUser.save();
        return next(
            appErrors.create(
                500,
                "Failed to send OTP email. Please try again later.",
                httpResponseText.FAIL
            )
        );
    }
});

export const verifyResetCode = asyncWraper(async (req, res, next) => {
    const { resetCode } = req.body;
    if (!resetCode) {
        const error = appErrors.create(
            400,
            "resetCode is required",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const hashedResetCode = crypto
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");

    const user = await User.findOne({
        "general.passwordResetCode": hashedResetCode,
        "general.passwordResetExpires": { $gt: Date.now() },
    });

    if (!user) {
        const error = appErrors.create(
            400,
            "Invalid or expired reset code",
            "Fail"
        );
        return next(error);
    }

    user.general.passwordResetVerified = true;
    user.general.passwordResetCode = null;
    user.general.passwordResetExpires = null;
    user.markModified("general");
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        message: "reset code verified successfully",
    });
});

export const resetPassword = asyncWraper(async (req, res, next) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        const error = appErrors.create(
            400,
            "email and newPassword are required",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const user = await User.findOne({ "general.email": email });
    if (!user) {
        const error = appErrors.create(
            404,
            "user not found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    if (!user.general.passwordResetVerified) {
        const error = appErrors.create(
            400,
            "reset code not verified",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.general.password = hashedPassword;
    user.general.passwordResetVerified = false;
    user.markModified("general");
    await user.save();
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        message: "password reset successfully",
    });
});
