import { z } from "zod";

export const announcementSchema = z.object({
    title: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The announcement title is required"
                    : "The announcement title must be a string",
        })
        .min(3, "The announcement title must be at least 3 characters long"),
    description: z.string({
        error: (iss) =>
            iss.input == undefined
                ? "The announcement description is required"
                : "The announcement description must be a string",
    }),
});
