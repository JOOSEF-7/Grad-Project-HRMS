// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Attendance from "./models/attendance.model.js"; // تأكد من المسار الصح

// dotenv.config();

// const seedAttendance = async () => {
//     try {
//         // 1. الاتصال بالداتابيز (استخدم نفس متغير الـ ENV بتاعك)
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log("Connected to MongoDB for seeding...");

//         const employeeIds = [
//             "69ab0e8ef8b15624c6050ec8",
//             "69ab2b13114e525e75292d48",
//             "69ab2b21114e525e75292d4b",
//             "69ab2b34114e525e75292d51",
//             "69ab2b43114e525e75292d57",
//             "69ab2b5f114e525e75292d5a",
//             "69ab2c36114e525e75292d5d",
//         ];

//         const statuses = ["On Time", "Late", "Absent"];
//         const records = [];

//         // توليد بيانات لآخر 7 أشهر
//         for (let i = 0; i < 210; i++) {
//             const date = new Date();
//             date.setDate(date.getDate() - i);

//             if (date.getDay() === 5 || date.getDay() === 6) continue;

//             const dateString = date.toISOString().split("T")[0];

//             // seed.js

//             employeeIds.forEach((empId) => {
//                 const randomStatus =
//                     statuses[Math.floor(Math.random() * statuses.length)];

//                 // بنجهز البيانات الأساسية الأول
//                 const record = {
//                     employeeId: empId,
//                     date: dateString,
//                     status: randomStatus,
//                 };

//                 // لو الموظف "مش غايب" (يعني حضر أو اتأخر)، بنضيف له وقت بصمة
//                 if (randomStatus !== "Absent") {
//                     const checkInTime = new Date(date);

//                     if (randomStatus === "On Time") {
//                         checkInTime.setHours(8, 0, 0); // بصم الساعة 8
//                     } else {
//                         checkInTime.setHours(10, 0, 0); // بصم الساعة 10 (متأخر)
//                     }

//                     record.checkIn = checkInTime; // ضفنا الحقل هنا بس
//                 }

//                 records.push(record);
//             });
//         }

//         // 2. مسح البيانات القديمة (اختياري عشان ميتكررش)
//         await Attendance.deleteMany({});

//         // 3. إدخال البيانات الجديدة
//         await Attendance.insertMany(records);
//         console.log(`Successfully inserted ${records.length} records!`);

//         // 4. قفل الاتصال عشان السكريبت يخلص
//         mongoose.connection.close();
//         process.exit();
//     } catch (error) {
//         console.error("Error during seeding:", error);
//         process.exit(1);
//     }
// };

// // لازم تنادي الدالة هنا!
// seedAttendance();
// const endDate = new Date().toISOString().split("T")[0];
// console.log(endDate);
// const start = new Date();
// console.log(start.getMonth());

// start.setMonth(start.getMonth() - 6); // ارجع 6 شهور
// const startDate = start.toISOString().split("T")[0];
// console.log(startDate);

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
dayjs.extend(utc);
dayjs.extend(timezone);

// const endDate = dayjs().format("YYYY-MM-DD");
// console.log(endDate); // هيطلع 2026-03-07 بناءً على توقيت جهازك

// // دي أهم حاجة في مشروعك: بتثبت "توقيت مصر" بغض النظر السيرفر فين
// const CAIRO_TZ = "Africa/Cairo";
// const now = dayjs().tz(CAIRO_TZ);
// const workStart = dayjs().tz(CAIRO_TZ).hour(8).minute(0).second(0);
// console.log("workStart", workStart); // هيطلع 2026-03-07T08:00:00+02:00 (مثلاً)
// console.log("workStart", workStart.format()); // هيطلع 2026-03-07T08:00:00+02:00 (مثلاً)

// const delayMinutes = now.diff(workStart, "minute");
// console.log(delayMinutes);
// if (delayMinutes > 0) {
//     console.log(`أنت متأخر ${delayMinutes} دقيقة`);
// }

// const now = dayjs().tz("Africa/Cairo").format();
// console.log("now", now);
// // console.log(now.format());
// // هيطلع التاريخ والوقت الحالي في توقيت مصر
// const today = now.split("T")[0];
// console.log("today", today); // هيطلع 2026-03-07 بناءً على توقيت مصر
// const now = dayjs().tz(CAIRO_TZ);
// console.log("now", now.format());
// const today = now.split("T")[0];
// console.log("today", today); // هيطلع 2026-03-07 بناءً على توقيت مصر
// const workStartDate = dayjs(now)
//     .set("hour", 8)
//     .set("minute", 0)
//     .set("second", 0)
//     .set("millisecond", 0);
// console.log("workStartDate", workStartDate); // هيطلع 2026-03-07T08:00:00+02:00 (مثلاً)
// const timeDifference = now.valueOf() - workStartDate.valueOf();
// const timeDifference = now.diff(workStartDate); // النتيجة بالملي ثاني
// console.log("timeDifference", timeDifference); // الفرق بالميلي ثانية
const endDate = dayjs(`2026-3-01`).endOf("month").format("YYYY-MM-DD");

console.log(endDate);
