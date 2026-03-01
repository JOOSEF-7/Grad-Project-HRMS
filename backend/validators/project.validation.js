import {z} from "zod";

export const validateProjectSchema = z.object({
    body: z.object({
        
        title: z.string({
            required_error: "title is required",
            invalid_type_error: "title must be a string",
        }),

        description: z.string({
            required_error: "description is required",
            invalid_type_error: "description must be a string",
        }),

        startDate: z.coerce.date({
            required_error: "startDate is required",
            invalid_type_error: "startDate must be a valid date",
        }).default(new Date()),

        deadline: z.coerce.date({
            required_error: "deadline is required",
            invalid_type_error: "deadline must be a valid date",
        }),

        status:z.enum(["Completed", "Active", "On-Hold"], {
            required_error: "status is required",
        }).default("On-Hold"),

        createdBy: z.string({
            required_error: "createdBy is required",
            invalid_type_error: "createdBy must be a string",
        }).regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid HR ID" }),

        team: z.array(z.string({
            required_error: "team member ID is required",
            invalid_type_error: "team member ID must be a string",
        }).regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid User ID" }))
    }),

})