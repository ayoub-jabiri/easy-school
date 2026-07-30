import z from "zod";

export const userSchema = z.object({
    fullName: z
        .string({
            error: "Full name is required",
        })
        .min(3, "Full name must be at least 3 characters long"),
    phoneNumber: z
        .string({ error: "Phone number is required" })
        .min(10, "Phone number must be at least 10 characters long"),
    email: z
        .string({ error: "Email is required" })
        .email("Invalid email address"),
    password: z
        .string({ error: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
});
