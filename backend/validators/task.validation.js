import { z } from "zod";

export const validateTaskSchema = z.object({
    body: z.object({
        projectId: z
            .string({
                required_error: "projectId is required",
                invalid_type_error: "projectId must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Project ID" }),

        assignedTo: z
            .string({
                required_error: "assignedTo is required",
                invalid_type_error: "assignedTo must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid User ID" }),

        title: z.string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        }),

        createdBy: z
            .string({
                required_error: "createdBy is required",
                invalid_type_error: "createdBy must be a string",
            })
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid HR ID" }),

        priority: z.enum(["Low", "Medium", "High"], {
            required_error: "priority is required",
        }),

        deadline: z.coerce.date({
            required_error: "deadline is required",
            invalid_type_error: "deadline must be a valid date",
        }),

        status: z
            .enum(["Pending", "Completed"], {
                required_error: "status is required",
            })
            .default("Pending"),
    }),
});
