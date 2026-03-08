import { httpResponseText } from "../utils/httpResponseText.js";
import User from "../models/user.model.js";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import appErrors from "../utils/errors.js";
import Attendance from "../models/attendance.model.js";
import Setting from "../models/settings.models.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

export const getAllAttendence = asyncWraper(async (req, res, next) => {
    const { date } = req.query;
    const pipeline = [];
    if (date) {
        pipeline.push({
            $match: { date: date },
        });
    }
    pipeline.push(
        {
            $lookup: {
                from: "users",
                localField: "employeeId",
                foreignField: "_id",
                as: "employeeDetails",
            },
        },
        {
            $unwind: "$employeeDetails",
        },
        {
            $project: {
                _id: 1,
                employeeId: 1,
                date: 1,
                checkIn: 1,
                status: 1,
                firstName: "$employeeDetails.general.firstName",
                lastName: "$employeeDetails.general.lastName",
                email: "$employeeDetails.general.email",
                department: "$employeeDetails.employee.department",
                jobType: "$employeeDetails.employee.jobType",
            },
        },
        { $sort: { checkIn: -1 } }
    );
    const attendance = await Attendance.aggregate(pipeline);
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { attendance },
    });
});

export const checkIn = asyncWraper(async (req, res, next) => {
    const { rfidTag } = req.body;
    if (!rfidTag) {
        const error = appErrors.create(
            400,
            "rfidTag is required",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const user = await User.findOne({ "general.rfidTag": rfidTag });
    if (!user) {
        const error = appErrors.create(
            404,
            "User not found with the provided RFID tag",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const setting = await Setting.findOne({});
    const workStartTime = setting?.workStartTime || "08:00";
    const timeZone = setting?.timeZone || "Africa/Cairo";
    const now = dayjs().tz(timeZone);
    const today = now.format("YYYY-MM-DD");

    const attendence = await Attendance.findOne({
        employeeId: user._id,
        date: today,
    });

    if (attendence) {
        const error = appErrors.create(
            400,
            "user already checked in",
            httpResponseText.FAIL
        );
        return next(error);
    }

    const [hours, minutes] = workStartTime.split(":").map(Number);
    const workStartDate = now
        .clone()
        .set("hour", hours)
        .set("minute", minutes)
        .set("second", 0)
        .set("millisecond", 0);
    const garcePeriod = 30 * 60 * 1000;
    const timeDifference = now.diff(workStartDate);
    const status = timeDifference <= garcePeriod ? "On Time" : "Late";

    const newAttendence = await Attendance.create({
        employeeId: user._id,
        date: today,
        checkIn: now,
        status,
    });
    newAttendence.__v = undefined;
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { newAttendence },
    });
});

export const getMonthlyAttendenceStats = asyncWraper(async (req, res, next) => {
    const { month, year } = req.query;
    if (!month || !year) {
        const error = appErrors.create(
            400,
            "month and year are required",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const startDate = dayjs(`${year}-${month}-01`)
        .subtract(5, "month")
        .format("YYYY-MM-DD");

    console.log(startDate);

    const endDate = dayjs(`${year}-${month}-01`)
        .endOf("month")
        .format("YYYY-MM-DD");
    console.log(endDate);

    const months = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const attendence = await Attendance.aggregate([
        {
            $match: {
                date: {
                    $gte: startDate,
                    $lte: endDate,
                },
            },
        },
        {
            $group: {
                // _id: { $substr: ["$date", 0, 7] },
                _id: {
                    year: {
                        $year: { $dateFromString: { dateString: "$date" } },
                    },
                    month: {
                        $month: { $dateFromString: { dateString: "$date" } },
                    },
                },

                onTimeCount: {
                    $sum: { $cond: [{ $eq: ["$status", "On Time"] }, 1, 0] },
                },
                lateCount: {
                    $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] },
                },
                absentCount: {
                    $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] },
                },
            },
        },
        {
            $project: {
                _id: 0,
                year: "$_id.year",
                month: "$_id.month",
                monthName: {
                    $arrayElemAt: [months, "$_id.month"],
                },
                onTimeCount: 1,
                lateCount: 1,
                absentCount: 1,
            },
        },
        { $sort: { year: 1, month: 1 } },
    ]);
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { monthlyAttendenceStats: attendence },
    });
});

export const getWeeklyAttendenceStats = asyncWraper(async (req, res, next) => {
    const { day, month, year } = req.query;
    if (!day || !month || !year) {
        const error = appErrors.create(
            400,
            "day and month and year are required",
            httpResponseText.FAIL
        );
        return next(error);
    }
    const startDate = dayjs(`${year}-${month}-${day}`)
        .subtract(6, "day")
        .format("YYYY-MM-DD");

    console.log(startDate);

    const endDate = dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD");
    console.log(endDate);

    const daysOfWeek = [
        "",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const attendence = await Attendance.aggregate([
        {
            $match: {
                date: {
                    $gte: startDate,
                    $lte: endDate,
                },
            },
        },
        {
            $group: {
                _id: "$date",
                onTimeCount: {
                    $sum: { $cond: [{ $eq: ["$status", "On Time"] }, 1, 0] },
                },
                lateCount: {
                    $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] },
                },
                absentCount: {
                    $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] },
                },
            },
        },
        {
            $project: {
                _id: 0,
                fullDate: "$_id",
                onTimeCount: 1,
                lateCount: 1,
                absentCount: 1,
                dayName: {
                    $arrayElemAt: [
                        daysOfWeek,
                        {
                            $dayOfWeek: {
                                $dateFromString: { dateString: "$_id" },
                            },
                        },
                    ],
                },
            },
        },
        { $sort: { fullDate: 1 } },
    ]);
    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: { weeklyAttendenceStats: attendence },
    });
});
