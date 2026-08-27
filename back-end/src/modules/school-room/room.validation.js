import { z } from "zod";

export const schoolRoomSchema = z.object({
    roomNumber: z.number({
        error: (iss) =>
            iss.input == undefined
                ? "The schoolroom number is required"
                : "The schoolroom number must be a number",
    }),
});
