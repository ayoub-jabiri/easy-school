import { z } from "zod";

export const schoolRoomSchema = z.object({
    roomNumber: z.number({
        error: (iss) =>
            iss.input == undefined
                ? "The school room number is required"
                : "The school room number must be a number",
    }),
});
