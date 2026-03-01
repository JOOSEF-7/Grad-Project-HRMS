import { z } from "zod";

export const validateApplicantSchema = z.object({
  body: z.object({
    jobId: z
      .string({
        required_error: "Course ID is required",
        invalid_type_error: "Course ID must be a string",
      })
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Job ID" }),

    firstName: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(3, "the minimum number of chracter is 3"),

    lastName: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(3, "the minimum number of chracter is 3"),

    gender: z.enum(["Male", "Female"], {
      required_error: "Gender is required",
    }),

    phone: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
      })
      .min(6, "the phone number must be at least 6 numbes long"),

    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email" }),

    resumeLink: z.string().url("Invalid URL").optional(),

    experience: z
      .number({
        required_error: "Experience is required",
        invalid_type_error: "Experience must be a number",
      })
      .nonnegative("Experience must be a non-negative number"),

    status: z
      .enum(["Applied", "Interviewing", "Hired", "Rejected"], {
        required_error: "Status is required",
      })
      .default("Applied"),

    avatar: z.string().default("/uploads/default-avatar.png"),
  }),
});
