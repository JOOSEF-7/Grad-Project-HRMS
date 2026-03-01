import { SUCCESS, FAIL, ERROR } from "../utils/httpResponseText.js";
import User from "../models/users.model.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import appErrors from "../utils/errors.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const getAllUsers = asyncWraper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .sort({ _id: 1 })
    .skip(skip)
    .limit(limit);
  res.json({ status: SUCCESS, data: { users } });
});

export const register = asyncWraper(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const error = appErrors.create(400, "user is already exist", "Fail");
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    avatar: req.file?.filename,
  });
  const { accessToken, refreshToken } = generateToken({
    email,
    userId: newUser._id,
    role: newUser.role,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  await newUser.save();
  newUser.password = undefined;
  newUser.__v = undefined;
  res.status(201).json({
    status: SUCCESS,
    message: "user is successfully is created ",
    data: {
      user: newUser,
      accessToken,
    },
  });
});

export const login = asyncWraper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = appErrors.create(
      400,
      "the email and password required",
      "Fail",
    );
    return next(error);
  }
  const user = await User.findOne({ email: email });
  // console.log("HACKED USER DATA: ", user);
  if (!user) {
    const error = appErrors.create(400, "Invalid email or password", "Fail");
    return next(error);
  }
  const isMatchedPass = await bcrypt.compare(password, user.password);
  if (!isMatchedPass) {
    const error = appErrors.create(400, "Invalid email or password", "Fail");
    return next(error);
  }
  const { accessToken, refreshToken } = generateToken({
    email,
    userId: user._id,
    role: user.role,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  user.password = undefined;
  user.__v = undefined;
  res.status(200).json({
    status: SUCCESS,
    message: "successfully login",
    data: {
      user,
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
    console.log(decoded);
    const payload = {
      email: decoded.email,
      userId: decoded.userId,
      role: decoded.role,
    };

    const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "20m",
    });
    res
      .status(200)
      .json({ status: SUCCESS, data: { accessToken: newAccessToken } });
  } catch (err) {
    return next(
      appErrors.create(401, "Invalid or expired refreshtoken", ERROR),
    );
  }
});
