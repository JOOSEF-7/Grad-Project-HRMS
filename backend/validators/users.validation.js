import { z } from "zod";

export const validateUserSchema = z.object({
    body: z.object({
        firstName: z
            .string({
                required_error: "the first name is required",
                invalid_type_error: "the first name must be a string",
            })
            .min(3, { message: "first name at least must be 3 chracters " }),
        lastName: z
            .string({
                required_error: "the last name is required",
                invalid_type_error: "the last name must be a string",
            })
            .min(3, { message: "last name at least must be 3 chracters" }),
        gender: z.enum(["Male", "Female"], {
            required_error: "gender is required",
        }),
        phone: z
            .string({
                required_error: "phone number is required",
                invalid_type_error: "the phone number must be a string",
            })
            .min(6, {
                message: "the phone number must be at least 6 numbes long",
            }),
        email: z
            .string({
                required_error: "email is required",
                invalid_type_error: "the email must be a string",
            })
            .email({ message: "must be vaild email  from zod " }),
        password: z
            .string({
                required_error: "password is required",
                invalid_type_error: "the password must be a string",
            })
            .min(8, { message: "pssword must be at least 8 characters " }),
        role: z
            .enum(["HR", "EMPLOYEE", "MANAGER"], {
                required_error: "role is required",
            })
            .default("EMPLOYEE"),
        rfidCard: z.string().optional(),
        jobTitle: z.string({
            required_error: "job title is required",
            invalid_type_error: "the job title must be a string",
        }),
        department: z.string({
            required_error: "department is required",
            invalid_type_error: "the department must be a string",
        }),
        baseSalary: z.number({
            required_error: "base salary is required",
            invalid_type_error: "the base salary must be a number",
        }),
        status: z
            .enum(["Active", "Archived"], {
                required_error: "status is required",
            })
            .default("Active"),
        avatar: z.string().default("/uploads/default-avatar.png"),
    }),
});
