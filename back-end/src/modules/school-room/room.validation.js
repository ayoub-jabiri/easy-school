import { z } from "zod";

export const schoolRoomSchema = z.object({
    title: z.string({
        error: (iss) =>
            iss.input == undefined
                ? "The school room title is required"
                : "The school room title must be a string",
    }),
    roomNumber: z
        .number({
            error: (iss) =>
                iss.input == undefined
                    ? "The school room number is required"
                    : "The school room number must be a number",
        })
        .min(1, "The school room number must be greater than 0"),
});
