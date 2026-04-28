import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
        family: 4,
    });

    const mailOptions = {
        from: `HRMS Support <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};
import sgMail from "@sendgrid/mail";

export const sendEmail = async (options) => {
    // 1. بنديله المفتاح اللي جبناه من ريلواي
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // 2. بنجهز الرسالة
    const msg = {
        to: options.email,
        from: process.env.EMAIL_USER,
        subject: options.subject,
        text: options.message,
    };

    await sgMail.send(msg);
};
