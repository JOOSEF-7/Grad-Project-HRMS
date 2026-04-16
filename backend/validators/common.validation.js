import { z } from "zod";

export const yearValidation = z.coerce
    .number({ required_error: "Year is required" })
    .min(2025, "Year must be 2025 or later")
    .max(2050, "Year is out of range");

export const monthValidation = z.coerce
    .number({ required_error: "Month is required" })
    .min(1, { message: "Month must be between 1 and 12" })
    .max(12, { message: "Month must be between 1 and 12" });

export const dayValidation = z.coerce
    .number()
    .min(1, { message: "day must be between 1 and 31" })
    .max(31, { message: "day must be between 1 and 31" });

export const pageValidation = z.coerce
    .number({ invalid_type_error: "Page must be a number" })
    .int()
    .min(1, { message: "Page must be at least 1" })
    .optional();

export const limitValidation = z.coerce
    .number({ invalid_type_error: "Limit must be a number" })
    .int()
    .min(1, { message: "Limit must be at least 1" })
    .max(100, { message: "Limit cannot exceed 100 records per page" })
    .optional();

export const dateValidation = z
    .string()
    .regex(/^\d{4}-\d{1,2}-\d{1,2}$/, {
        message: "Invalid date format. Use YYYY-MM-DD or YYYY-M-D",
    })
    .optional();

export const statusValidation = (...status) => {
    return z.enum(status, {
        errorMap: () => ({ message: "Invalid leave status" }),
    });
};

export const validateIdParams = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID" }),
    }),
});

export const validateMonthYearQuery = z.object({
    query: z.object({
        month: monthValidation,
        year: yearValidation,
    }),
});

export const validateYearQuery = z.object({
    query: z.object({
        year: yearValidation,
    }),
});

export const searchQuerySchema = z.object({
    query: z.object({
        employeeName: z
            .string({
                required_error: "Search term is required",
                invalid_type_error: "Search term must be a string",
            })
            .min(1, "Search term cannot be empty"),

        date: dateValidation,
        page: pageValidation,
        limit: limitValidation,
    }),
});
