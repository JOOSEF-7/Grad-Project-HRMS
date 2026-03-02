import { z } from "zod";

export const validateJobSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "the job title is required",
      invalid_type_error: "the job title must be a string",
    }),

    description: z.string({
      required_error: "the job description is required",
      invalid_type_error: "the job description must be a string",
    }),

    requirements: z.array(z.string(), {
      required_error: "the job requirements are required",
      invalid_type_error: "the job requirements must be an array of strings",
    }),

    status: z.enum(["Open", "Closed"]).default("Open"),

    date: z.coerce.date().default(new Date()),
  }),
});
