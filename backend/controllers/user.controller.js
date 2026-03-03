import User from "../models/user.model.js";
import { httpResponseText } from "../utils/httpResponseText.js";
import appErrors from "../utils/errors.js";
import bcrypt from "bcrypt";
import { flatten } from 'flat';

export const getAllUsers = async (req, res) => {
    const users = await User.find(
        {},
        { __v: false, "general.password": false }
    );
    res.status(200).json({ status: httpResponseText.SUCCESS, data: { users } });
};  

export const getUserById = async (req, res, next) => {
    const userID = req.params.id;
    const user = await User.findById(userID, {
        __v: false,
        "general.password": false,
    });
    if (!user) {
        const error = appErrors.create(
            "User Not Found",
            404,
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({ status: httpResponseText.SUCCESS, data: { user } });
};

export const createUser = async (req, res, next) => {
    //
    const { general, experience, employee } = req.body;

    const oldUser = await User.findOne({ "general.email": general.email });

    if (oldUser) {
        const error = appErrors.create(
            "User Already Exists",
            400,
            httpResponseText.FAIL
        );
        return next(error);
    }

    const hashedPassword = await bcrypt.hash(general.password, 8);
    general.password = hashedPassword;

    const newUser = new User({ general, experience, employee });

    await newUser.save();

    newUser.general.password = undefined;
    newUser.__v = undefined;

    res.status(201).json({ status: httpResponseText.SUCCESS, data: { newUser } });
};

export const updateUser = async (req, res, next) => {
    const userID = req.params.id;

    if (req.body.general.password) {
        const hashedPassword = await bcrypt.hash(req.body.general.password, 8);
        req.body.general.password = hashedPassword;
    }

    const updateData = flatten(req.body); //Convert Nested Object to Dot Notation

    const updatedUser = await User.findByIdAndUpdate(
        userID,
        { $set: updateData },
        { returnDocument: "after", runValidators: true }
    );
    if (!updatedUser) {
        const error = appErrors.create(
            "User Not Found",
            404,
            httpResponseText.FAIL
        );
        return next(error);
    }
    updatedUser.general.password = undefined;
    updatedUser.__v = undefined;
    res.json({
        status: httpResponseText.SUCCESS,
        data: { user: updatedUser },
    });
};
export const deleteUser = async (req, res, next) => {
    const userID = req.params.id;
    const user = await User.findByIdAndDelete(userID);
    if (!user) {
        const error = appErrors.create(
            "User Not Found",
            404,
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.json({ status: httpResponseText.SUCCESS, data: null });
};
