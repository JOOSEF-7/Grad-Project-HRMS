import Leave from "../models/leave.model.js";
import User from "../models/user.model.js";
import appErrors from "../utils/errors.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import dayjs from "dayjs";
import { httpResponseText } from "../utils/httpResponseText.js";
import mongoose from "mongoose";

export const getAllLeaves = asyncWraper(async (req, res, next) => {
    const leaves = await Leave.find();
    res.status(200).json({ status: httpResponseText.SUCCESS, data: leaves });
});

export const createLeave = asyncWraper(async (req, res, next) => {
    const { type, startDate, endDate, reason, attachment } = req.body;
    const employeeId = req.currentUser.userId;
    const user = await User.findById(employeeId);
    if (!user) {
        const error = appErrors.create(
            400,
            "Employee not found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    if (type === "Sick" && (!attachment || attachment.trim() === "")) {
        return next(
            appErrors.create(
                400,
                "Medical attachment report is required for Sick leave.",
                httpResponseText.FAIL
            )
        );
    }
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const duration = end.diff(start, "days") + 1;

    const leaveType = type.toLowerCase();
    if (user.employee.leaveBalance[leaveType] !== undefined) {
        if (duration > user.employee.leaveBalance[leaveType]) {
            const error = appErrors.create(
                400,
                `Leave duration is greater than ${leaveType} leave balance`,
                httpResponseText.FAIL
            );
            return next(error);
        }
    }
    const overLappedLeave = await Leave.findOne({
        employeeId,
        status: { $in: ["Pending", "Approved"] },
        startDate: { $lte: endDate },
        endDate: { $gte: startDate },
    });
    if (overLappedLeave) {
        const error = appErrors.create(
            400,
            "You aleady have an leave pending or approved in this period",
            httpResponseText.FAIL
        );

        return next(error);
    }
    if (user.employee.leaveBalance[leaveType] !== undefined) {
        const typeToMatch =
            type === "Casual" || type === "Annual"
                ? ["Casual", "Annual"]
                : [type];

        const pendingLeaves = await Leave.aggregate([
            {
                $match: {
                    employeeId: new mongoose.Types.ObjectId(employeeId),
                    status: "Pending",
                    type: { $in: typeToMatch },
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$duration" },
                },
            },
        ]);

        let totalPendingTypeLeaves = 0;
        let totalCompinedLeaves = 0;

        pendingLeaves.forEach((leave) => {
            if (leave._id === type) totalPendingTypeLeaves = leave.total;
            if (leave._id === "Annual" || leave._id === "Casual") {
                totalCompinedLeaves += leave.total;
            }
        });
        if (
            duration + totalPendingTypeLeaves >
            user.employee.leaveBalance[leaveType]
        ) {
            const error = appErrors.create(
                400,
                `Cannot apply for ${duration} days. You have ${totalPendingTypeLeaves} pending ${type} days. Your exact available ${type} balance is ${user.employee.leaveBalance[leaveType] - totalPendingTypeLeaves}.`,
                httpResponseText.FAIL
            );
            return next(error);
        }
        if (type === "Casual" || type === "Annual") {
            if (
                duration + totalCompinedLeaves >
                user.employee.leaveBalance.annual
            ) {
                console.log(totalCompinedLeaves);
                const error = appErrors.create(
                    400,
                    `Cannot apply for ${duration} days. You have ${totalCompinedLeaves} pending Annual and Casual days combined. Your total available Annual limit is ${user.employee.leaveBalance.annual - totalCompinedLeaves} days.`,
                    httpResponseText.FAIL
                );
                return next(error);
            }
        }
    }

    const leave = await Leave.create({
        employeeId,
        type,
        startDate,
        endDate,
        reason,
        attachment,
        duration,
    });
    res.status(201).json({ status: httpResponseText.SUCCESS, data: leave });
});

export const getUserLeavesById = asyncWraper(async (req, res, next) => {
    const { id } = req.params;
    if (req.currentUser.role !== "HR" && req.currentUser.userId !== id) {
        const error = appErrors.create(
            403,
            "Forbidden, You are not allowed to view leave of other users",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const user = await User.findById(id);
    if (!user) {
        const error = appErrors.create(
            404,
            "User not found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const leaves = await Leave.find({ employeeId: user._id }, { __v: 0 });
    res.status(200).json({ status: httpResponseText.SUCCESS, data: leaves });
});

export const getLeaveById = asyncWraper(async (req, res, next) => {
    const { id } = req.params;
    const leave = await Leave.findById(id, { __v: 0 });
    if (!leave) {
        const error = appErrors.create(
            404,
            "Leave not found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.status(200).json({ status: httpResponseText.SUCCESS, data: leave });
});

export const updateLeave = asyncWraper(async (req, res, next) => {
    const id = req.params.id;
    const employeeId = req.currentUser.userId;
    const updatedData = req.body;

    const user = await User.findById(employeeId);
    if (!user) {
        return next(
            appErrors.create(404, "Employee not found", httpResponseText.FAIL)
        );
    }

    if (Object.keys(updatedData).length === 0) {
        return next(
            appErrors.create(
                400,
                "Please provide data to update",
                httpResponseText.FAIL
            )
        );
    }

    const oldLeave = await Leave.findOne({
        _id: id,
        employeeId: employeeId,
        status: "Pending",
    });

    if (!oldLeave) {
        return next(
            appErrors.create(404, "Leave is not found", httpResponseText.FAIL)
        );
    }

    const { type, startDate, endDate, reason, attachment } = req.body;

    const newStartDate = startDate || oldLeave.startDate;
    const newEndDate = endDate || oldLeave.endDate;

    const start = dayjs(newStartDate);
    const end = dayjs(newEndDate);

    if (start.isAfter(end)) {
        return next(
            appErrors.create(
                400,
                "End date cannot be before start date",
                httpResponseText.FAIL
            )
        );
    }
    const duration = end.diff(start, "days") + 1;

    const newType = type || oldLeave.type;
    const leaveType = newType.toLowerCase();

    if (user.employee.leaveBalance[leaveType] !== undefined) {
        if (duration > user.employee.leaveBalance[leaveType]) {
            return next(
                appErrors.create(
                    400,
                    `Leave duration is greater than ${leaveType} leave balance`,
                    httpResponseText.FAIL
                )
            );
        }
    }

    const overLappedLeave = await Leave.findOne({
        _id: { $ne: oldLeave._id },
        employeeId,
        status: { $in: ["Pending", "Approved"] },
        startDate: { $lte: newEndDate },
        endDate: { $gte: newStartDate },
    });

    if (overLappedLeave) {
        return next(
            appErrors.create(
                400,
                "You already have a leave pending or approved in this period",
                httpResponseText.FAIL
            )
        );
    }

    if (startDate || endDate || type) {
        const typeToMatch =
            newType === "Casual" || newType === "Annual"
                ? ["Casual", "Annual"]
                : [newType];

        const pendingLeaves = await Leave.aggregate([
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(id) },
                    employeeId: new mongoose.Types.ObjectId(employeeId),
                    status: "Pending",
                    type: { $in: typeToMatch },
                },
            },
            {
                $group: {
                    _id: "$type",
                    total: { $sum: "$duration" },
                },
            },
        ]);

        let totalPendingTypeLeaves = 0;
        let totalCompinedLeaves = 0;

        pendingLeaves.forEach((leave) => {
            if (leave._id === newType) totalPendingTypeLeaves = leave.total;
            if (leave._id === "Annual" || leave._id === "Casual") {
                totalCompinedLeaves += leave.total;
            }
        });

        if (
            duration + totalPendingTypeLeaves >
            user.employee.leaveBalance[leaveType]
        ) {
            return next(
                appErrors.create(
                    400,
                    `Cannot apply for ${duration} days. You have ${totalPendingTypeLeaves} pending ${newType} days. Your exact available ${newType} balance is ${user.employee.leaveBalance[leaveType] - totalPendingTypeLeaves}.`,
                    httpResponseText.FAIL
                )
            );
        }

        if (newType === "Casual" || newType === "Annual") {
            if (
                duration + totalCompinedLeaves >
                user.employee.leaveBalance.annual
            ) {
                return next(
                    appErrors.create(
                        400,
                        `Cannot apply for ${duration} days. You have ${totalCompinedLeaves} pending Annual and Casual days combined. Your total available Annual limit is ${user.employee.leaveBalance.annual - totalCompinedLeaves} days.`,
                        httpResponseText.FAIL
                    )
                );
            }
        }
    }
    const finalAttachment =
        attachment !== undefined ? attachment : oldLeave.attachment;
    if (
        newType === "Sick" &&
        (!finalAttachment || finalAttachment.trim() === "")
    ) {
        return next(
            appErrors.create(
                400,
                "Medical attachment report is required for Sick leave.",
                httpResponseText.FAIL
            )
        );
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
        id,
        {
            type: newType,
            startDate: newStartDate,
            endDate: newEndDate,
            duration,
            reason: reason || oldLeave.reason,
            attachment: finalAttachment,
        },
        { new: true, runValidators: true }
    );

    res.status(200).json({ status: "success", data: updatedLeave });
});

export const updateLeaveStatus = asyncWraper(async (req, res, next) => {
    const { id } = req.params;
    const { status, rejectReason } = req.body;
    const hrId = req.currentUser.userId;

    const leave = await Leave.findById(id);
    if (!leave) {
        return next(
            appErrors.create(404, "Leave is not found", httpResponseText.FAIL)
        );
    }
    if (leave.status !== "Pending") {
        return next(
            appErrors.create(
                400,
                `This leave is already ${leave.status} and cannot be modified`,
                httpResponseText.FAIL
            )
        );
    }
    if (status === "Approved") {
        const user = await User.findById(leave.employeeId);
        if (!user) {
            return next(
                appErrors.create(
                    404,
                    "Employee not found",
                    httpResponseText.FAIL
                )
            );
        }
        const leaveType = leave.type.toLowerCase();
        if (user.employee.leaveBalance[leaveType] !== undefined) {
            if (leaveType === "casual") {
                user.employee.leaveBalance[leaveType] -= leave.duration;
                user.employee.leaveBalance.annual -= leave.duration;
            } else {
                user.employee.leaveBalance[leaveType] -= leave.duration;
            }
            await user.save();
        }
        leave.status = "Approved";
        leave.hrId = hrId;
        await leave.save();

        res.status(200).json({ status: "success", data: leave });
    }
    if (status === "Rejected") {
        if (rejectReason) {
            leave.rejectReason = rejectReason;
        }
        leave.status = "Rejected";
        leave.hrId = hrId;
        await leave.save();
        res.status(200).json({ status: "success", data: leave });
    }
});

export const deleteLeave = asyncWraper(async (req, res, next) => {
    const { id } = req.params;
    const deletedLeave = await Leave.findByIdAndDelete(id);
    if (!deletedLeave) {
        const error = appErrors.create(
            400,
            "Leave not found",
            httpResponseText.FAIL
        );
        return next(error);
    }
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { id: deletedLeave._id },
    });
});
