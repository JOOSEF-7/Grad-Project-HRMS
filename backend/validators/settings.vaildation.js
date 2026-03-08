import { z } from "zod";

export const updateSettingsSchema = z.object({
    body: z.object({
        companyName: z.string({ required_error: "company name is required" }),
        companyLogo: z.string().default("/uploads/default-logo.svg"),
        companyEmail: z
            .string({
                required_error: "email is required",
            })
            .email({ message: "must be a valid email" }),
        timeZone: z.string().default("Africa/Cairo"),
        workStartTime: z.string().default("08:00"),
        weekEnds: z.array(z.number().min(0).max(6)).default([5, 6]),
        holidays: z.array(z.string()).default([]),
    }),
});
