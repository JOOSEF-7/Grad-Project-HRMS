import { z } from "zod";

export const validateAttendenceSchema = z.object({
  body: z.object({
    emploeeId: z
      .string({
        required_error: "employee id is required",
        invalid_type_error: "employee id must be a string",
      })
      .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid Employee ID" }),

    checkIn: z.coerce.date({
      required_error: "check in date is required",
      invalid_type_error: "check in must be a valid date",
    }),
    // checkOut: z.coerce
    //   .date({
    //     required_error: "check out date is required",
    //     invalid_type_error: "check out must be a valid date",
    //   })
    //   .optional(),
    status: z.enum(["Present", "Absent", "Late"], {
      required_error: "status is required",
    }).default("Absent"),
    // totalHours: z
    //   .number({
    //     required_error: "total hours is required",
    //     invalid_type_error: "total hours must be a number",
    //   })
    //   .optional(),
  }),
});
