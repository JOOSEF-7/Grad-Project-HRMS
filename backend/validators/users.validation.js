import { z } from "zod";

export const validateUserSchema = z.object({
    body: z.object({
        general: z.object({
            firstName: z
                .string({
                    required_error: "the first name is required",
                    invalid_type_error: "the first name must be a string",
                })
                .min(3, {
                    message: "first name at least must be 3 characters",
                }),

            lastName: z
                .string({
                    required_error: "the last name is required",
                    invalid_type_error: "the last name must be a string",
                })
                .min(3, { message: "last name at least must be 3 characters" }),

            email: z
                .string({
                    required_error: "email is required",
                })
                .email({ message: "must be a valid email" }),

            password: z
                .string({
                    required_error: "password is required",
                })
                .min(8, {
                    message: "password must be at least 8 characters long",
                }),

            role: z.enum(["HR", "EMPLOYEE", "MANAGER"]).default("EMPLOYEE"),

            rfidCard: z.string().optional(),

            phone: z
                .string({
                    required_error: "phone number is required",
                })
                .min(6, {
                    message: "the phone number must be at least 6 numbers long",
                }),

            gender: z.enum(["Male", "Female"], {
                required_error: "gender is required",
            }),

            address: z.string({
                required_error: "address is required",
            }),

            avatar: z.string().default("/uploads/default-avatar.png"),
        }),

        experience: z
            .object({
                company: z.string().optional(),

                position: z.string().optional(),

                jobType: z
                    .enum(["Full-time", "Part-time", "Internship"])
                    .optional(),

                baseSalary: z.coerce.number().optional(),

                startDate: z.coerce.date().optional(),

                endDate: z.coerce.date().optional(),
            })
            .optional(),

        employee: z.object({
            jobTitle: z.string({
                required_error: "job title is required",
            }),

            department: z.string({
                required_error: "department is required",
            }),

            workLocation: z.string({
                required_error: "work location is required",
            }),

            jobType: z.enum(["Full-time", "Part-time", "Internship"], {
                required_error: "job type is required",
            }),

            joiningDate: z.coerce.date({
                required_error: "joining date is required",
            }),

            baseSalary: z.coerce.number({
                required_error: "base salary is required",
            }),

            status: z.enum(["Active", "Archived"]).default("Active"),
        }),
    }),
});

export const updateValidateUserSchema = z.object({
    body: z
        .object({
            general: validateUserSchema.shape.body.shape.general.partial(),

            employee: validateUserSchema.shape.body.shape.employee.partial(),

            experience: validateUserSchema.shape.body.shape.experience,
        })
        .partial(),
});

export const validateLogInSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: "email is required" })
            .email({ message: "must be vaild email " }),
        password: z
            .string({ required_error: "password is required" })
            .min(8, { message: "pssword must be at least 8 characters " }),
    }),
});
export const forgetPasswordSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: "email is required" })
            .email({ message: "must be vaild email " }),
    }),
});

export const verifyResetCodeSchema = z.object({
    body: z.object({
        resetCode: z
            .string({
                required_error: "reset code is required",
                invalid_type_error: "reset code must be a string",
            })
            .length(6, { message: "reset code must be exactly 6 digits" })
            .regex(/^\d+$/, {
                message: "reset code must contain only numbers",
            }),
    }),
});

export const resetPasswordSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: "email is required" })
            .email({ message: "must be vaild email  from zod " }),
        newPassword: z
            .string({ required_error: "password is required" })
            .min(8, { message: "pssword must be at least 6 characters " }),
    }),
});
