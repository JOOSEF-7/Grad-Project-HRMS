import { z } from "zod";

export const validateAttendenceSchema = z.object({
    body: z.object({
        emploeeId: z
            .string({
                required_error: "employee id is required",
                invalid_type_error: "employee id must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Employee ID" }),

        date: z.string({
            required_error: "date is required",
            invalid_type_error: "date must be a string",
        }),
        checkIn: z.coerce.date({}).optional(),

        status: z
            .enum(["On Time", "Absent", "Late"], {
                required_error: "status is required",
            })
            .default("Absent"),

        delayMinutes: z.number().default(0),

        isProcessed: z.boolean().default(false),
    }),
});

export const validateCheckInSchema = z.object({
    body: z.object({
        rfidTag: z
            .string({
                required_error: "rfidTag is required",
            })
            .length(8, { message: "rfidTag must be exactly 8 characters" })
            .regex(/^[0-9a-fA-F]+$/, {
                message: "Invalid RFID format (Hex only)",
            }),
    }),
});

export const monthlyStatsSchema = z.object({
    query: z.object({
        month: z.coerce
            .number()
            .min(1, { message: "month must be between 1 and 12" })
            .max(12, { message: "month must be between 1 and 12" }),
        year: z.coerce.number().min(2020).max(2050),
    }),
});

export const weeklyStatsSchema = z.object({
    query: z.object({
        day: z.coerce
            .number()
            .min(1, { message: "day must be between 1 and 31" })
            .max(31, { message: "day must be between 1 and 31" }),
        month: z.coerce
            .number()
            .min(1, { message: "month must be between 1 and 12" })
            .max(12, { message: "month must be between 1 and 12" }),
        year: z.coerce.number().min(2020).max(2050),
    }),
});
