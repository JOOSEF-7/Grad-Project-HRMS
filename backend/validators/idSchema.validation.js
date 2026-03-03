import { z } from "zod";

export const validateIdSchema = z.object({
    params: z.object({
        id: z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid user ID" }),
    }),
});
