import { z } from "zod";

export const subjectSchema = z.object({
    title: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The subject title is required"
                    : "The subject title must be a string",
        })
        .min(3, "The subject title must be at least 3 characters long"),
});
