import cron from "node-cron";
import User from "../models/user.model.js";
import Attendance from "../models/attendance.model.js";
import Setting from "../models/settings.models.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

const attendanceJob = async () => {
    try {
        const setting = await Setting.findOne({});
        const timeZone = setting?.timeZone || "Africa/Cairo";
        const now = dayjs().tz(timeZone);
        const today = now.format("YYYY-MM-DD");
        const dayOf = now.day();
        if (!setting) {
            console.log(
                "No setting found. please create a setting in the database."
            );
            return;
        }
        if (setting.weekEnds?.includes(dayOf)) {
            console.log(
                "Today is a weekend. No attendance records will be created."
            );
            return;
        }
        if (setting.holidays?.includes(today)) {
            console.log(
                "Today is a holiday. No attendance records will be created."
            );
            return;
        }

        const employees = await User.find({
            "general.role": { $in: ["EMPLOYEE", "HR"] },
            "employee.status": "Active",
        });
        const attendandedEmployeeIds = await Attendance.find({
            date: today,
        }).distinct("employeeId");

        const absentUsers = employees.filter(
            (employee) =>
                !attendandedEmployeeIds
                    .map((id) => id.toString())
                    .includes(employee._id.toString())
        );
        if (absentUsers.length > 0) {
            const attendanceRecords = absentUsers.map((employee) => ({
                employeeId: employee._id,
                date: today,
                status: "Absent",
            }));
            await Attendance.insertMany(attendanceRecords);
            console.log(
                `Successfully created ${attendanceRecords.length} attendance records for the users who are not attending today.`
            );
        }
    } catch (error) {
        console.error("Error in attendance job:", error);
    }
};

const scheduleAttendanceJob = async () => {
    try {
        const setting = await Setting.findOne({});
        const timeZone = setting?.timeZone || "Africa/Cairo";
        cron.schedule(
            "59 23 * * *",
            () => {
                console.log("Executing Attendance Job ");
                attendanceJob();
            },
            {
                timezone: timeZone,
            }
        );
    } catch (error) {
        console.error("Error scheduling attendance job:", error);
    }
};

export default scheduleAttendanceJob;
