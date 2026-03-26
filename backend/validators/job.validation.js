import { z } from "zod";

export const validateJobSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Job title is required",
      invalid_type_error: "Job title must be a string",
    }).min(3, "Title must be at least 3 characters"),

    description: z.string({
      required_error: "Job description is required",
    }),

    requirements: z.array(z.string(), {
      required_error: "Requirements must be an array of strings",
    }).min(1, "Please provide at least one requirement"),

    status: z.enum(["Open", "Closed"]).default("Open").optional(),
  }),
});


export const validateUpdateJobSchema = z.object({
  body: validateJobSchema.shape.body.partial(),
});