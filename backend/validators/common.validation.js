import { z } from "zod";
export const yearValidation = z.coerce
    .number({ required_error: "Year is required" })
    .min(2025, "Year must be 2025 or later")
    .max(2050, "Year is out of range");

export const monthValidation = z.coerce
    .number({ required_error: "Month is required" })
    .min(1, { message: "Month must be between 1 and 12" })
    .max(12, { message: "Month must be between 1 and 12" });

export const validateYearQuery = z.object({
    query: z.object({
        year: yearValidation,
    }),
});

export const validateMonthYearQuery = z.object({
    query: z.object({
        month: monthValidation,
        year: yearValidation,
    }),
});
