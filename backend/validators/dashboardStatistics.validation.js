import { z } from "zod";

export const validateEmployeeStatisticsSchema = z.object({
    query: z.object({
        month: z.string().regex(/^(0?[1-9]|1[0-2])$/, {
            message: "Month must be between 1 and 12",
        }),
        year: z.string().regex(/^\d{4}$/, {
            message: "Year must be a 4-digit number",
        }),
    }),
});

export const validateApplicantStatisticsSchema = z.object({
    query: z.object({
        month: z.string()
            .regex(/^(0?[1-9]|1[0-2])$/, "Month must be between 1 and 12"),
        
        year: z.string()
            .regex(/^\d{4}$/, "Year must be a 4-digit number"),

        status: z.enum(["Applied", "Interviewing", "Hired", "Rejected"]).optional()
    })
});

export const validatePayrollStatisticsSchema = z.object({
    query: z.object({
        month: z
            .string()
            .regex(/^(0?[1-9]|1[0-2])$/, {
                message: "Month must be between 1 and 12",
            }),
        year: z
            .string()
            .regex(/^\d{4}$/, { message: "Year must be a 4-digit number" }),
    }),
});

export const validateProjectSummarySchema = z.object({
    query: z.object({
        status: z.enum(["On-going", "Pending", "Completed"]).optional(),
    }),
});