import OpenAI from "openai";
import { asyncWraper } from "../Middleware/asyncWraper.js";
import appErrors from "../utils/errors.js";
import { httpResponseText } from "../utils/httpResponseText.js";

const groq = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const askChatbot = asyncWraper(async (req, res, next) => {
    const { message } = req.body;
    const userRole = req.currentUser.role;

    if (!message) {
        return next(
            appErrors.create(400, "Message is required", httpResponseText.FAIL)
        );
    }

    let systemPrompt = `You are the 'Staffly AI Assistant', an intelligent and professional HR expert integrated deeply into the 'Staffly' Human Resource Management System. 
    Staffly is a modern HRMS featuring: IoT-based RFID Attendance, Automated Payroll calculations, Leave & Request Management, Task & Project Tracking, and an AI-powered Applicant Tracking System (ATS).
    Your primary goal is to guide users on how to use the system effectively. 
    Rules:
    - Be concise, professional, and highly helpful.
    - You MUST respond in the exact same language the user speaks to you (Arabic or English).
    - Do not invent fictional employee data; instead, explain the workflow.`;

    // 2. Role-Based Context Injection
    if (userRole === "HR" || userRole === "MANAGER") {
        systemPrompt += `
        CONTEXT: You are assisting an HR Administrator or Manager.
        CAPABILITIES TO EXPLAIN:
        - Hiring & ATS: Explain how the system uses a Random Forest Machine Learning model to evaluate resumes, calculate match scores, and rank applicants.
        - Payroll Management: Guide them through the 3-stage payroll lifecycle (Generate Draft, Approve Payroll, and Pay All).
        - Attendance: Explain how the RFID hardware automatically logs 'On Time', 'Late', or 'Absent' statuses based on company grace periods.
        - Workforce: Assist them in managing projects, assigning tasks, and reviewing performance statistics or leave requests.`;
    } else {
        systemPrompt += `
        CONTEXT: You are assisting a standard Employee.
        CAPABILITIES TO EXPLAIN:
        - Self-Service Portal: Guide them on how to use the Mobile or Web app to submit leave requests (Annual, Sick, Casual, Unpaid) and general HR requests.
        - Attendance & Tasks: Explain how they can track their daily RFID check-ins, view assigned tasks, and update task progress.
        - Payroll: Guide them on how to view their monthly Payslips securely.
        RESTRICTION: You are strictly forbidden from revealing administrative workflows, ATS scoring logic, or other employees' private HR configurations.`;
    }

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 600,
    });

    const aiResponse = completion.choices[0].message.content;

    res.status(200).json({
        status: httpResponseText.SUCCESS,
        data: {
            reply: aiResponse,
        },
    });
});
