import { z } from "zod";

export const validatePayrollSchema = z.object({
    body: z.object({
        employeeId: z
            .string({
                required_error: "employeeId is required",
                invalid_type_error: "employeeId must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Employee ID" }),

        month: z
            .string({
                required_error: "month is required",
                invalid_type_error: "month must be a string",
            })
            .regex(/^(0?[1-9]|1[0-2])$/, { message: "Invalid month format" }),

        year: z
            .string({
                required_error: "year is required",
                invalid_type_error: "year must be a string",
            })
            .regex(/^\d{4}$/, { message: "Invalid year format" }),

        baseSalary: z.number({
            required_error: "baseSalary is required",
            invalid_type_error: "baseSalary must be a number",
        }),

        netSalary: z.number({
            required_error: "netSalary is required",
            invalid_type_error: "netSalary must be a number",
        }),

        deductions: z.number({
            required_error: "deductions is required",
            invalid_type_error: "deductions must be a number",
        }),

        daysPresent: z.number({
            required_error: "daysPresent is required",
            invalid_type_error: "daysPresent must be a number",
        }),

        daysAbsentt: z.number({
            required_error: "daysAbsentt is required",
            invalid_type_error: "daysAbsentt must be a number",
        }),

        status: z.enum(["Paid", "Unpaid", "Pending"], {
            required_error: "status is required",
        }).default("Pending"),
    }),
});
