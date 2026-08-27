import { z } from "zod";

export const schoolRoomSchema = z.object({
    roomNumber: z.number({
        error: (iss) =>
            iss.input == undefined
                ? "The room number is required"
                : "The room number must be a number",
    }),
});
