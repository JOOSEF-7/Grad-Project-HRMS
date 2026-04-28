import sgMail from "@sendgrid/mail";

export const sendEmail = async (options) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: options.email,
        from: process.env.EMAIL_USER,
        subject: options.subject,
        text: options.message,
    };

    await sgMail.send(msg);
};
