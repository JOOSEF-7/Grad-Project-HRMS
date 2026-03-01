import { z } from "zod";

export const validateUserSchema = z.object({
  body: z.object({
    firstName: z
      .string({ required_error: "the first name is required" })
      .min(2, { message: "first name at least must be 2 chracters " }),
    lastName: z
      .string({ required_error: "the last name is required" })
      .min(2, { message: "last name at least must be 2 chracters" }),
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "must be vaild email  from zod " }),
    password: z
      .string({ required_error: "password is required" })
      .min(6, { message: "pssword must be at least 6 characters " }),

    role: z.enum(["USER", "ADMIN", "MANGER"]).default("USER"),
    avatar: z.string().default("uploads/image.png"),
  }),
});

export const validateLogInSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "email is required" })
      .email({ message: "must be vaild email  from zod " }),
    password: z
      .string({ required_error: "password is required" })
      .min(6, { message: "pssword must be at least 6 characters " }),
  }),
});
