import { z } from "zod";

export const validateLeaveSchema = z.object({
  body: z.object({
    emploeeId: z
      .string({
        required_error: "employee id is required",
        invalid_type_error: "employee id must be a string",
      })
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Employee ID" }),
    type: z.enum(["Sick", "Annual", "Unpaid"], {
      required_error: "leave type is required",
    }),
    startDate: z.coerce.date({
      required_error: "start date is required",
      invalid_type_error: "start date must be a valid date",
    }),
    endDate: z.coerce.date({
      required_error: "end date is required",
      invalid_type_error: "end date must be a valid date",
    }),
    reason: z.string({
      required_error: "reason is required",
      invalid_type_error: "reason must be a string",
    }),
    status: z
      .enum(["Pending", "Approved", "Rejected"], {
        required_error: "status is required",
      })
      .default("Pending"),
  }),
});
