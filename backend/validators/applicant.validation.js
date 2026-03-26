import { z } from "zod";

export const validateApplicantSchema = z.object({
    params: z.object({
        jobId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Job ID format"),
    }),

    body: z.object({
        firstName: z
            .string({
                required_error: "First name is required",
                invalid_type_error: "First name must be a string",
            })
            .min(3, "First name is too short"),
        lastName: z
            .string({
                required_error: "Last name is required",
                invalid_type_error: "Last name must be a string",
            })
            .min(3, "Last name is too short"),

        gender: z.enum(["Male", "Female"], {
            required_error: "Gender is required",
        }),

        phone: z.string().min(6, "Phone number must be at least 6 numbers"),

        email: z.string().email("Invalid email format"),

        resumeLink: z.string().url("Invalid URL").optional(),

        status: z
            .enum(["Applied", "Interviewing", "Hired", "Rejected"])
            .default("Applied"),

        avatar: z.string().optional(),

        experience: z
            .object({
                company: z.string().optional(),
                position: z.string().optional(),
                jobType: z
                    .enum(["Full-time", "Part-time", "Internship"])
                    .optional(),
                baseSalary: z.number().nonnegative().optional(),
                startDate: z.coerce.date().optional(),
                endDate: z.coerce.date().optional(),
            })
            .optional(),
    }),
});

export const validateUpdateApplicantSchema = z.object({
    body: validateApplicantSchema.shape.body.partial(),
});
