import { z } from "zod";

export const userSchema = z.object({
    fullName: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The user fullname is required"
                    : "The user fullname must be a string",
        })
        .min(3, "The user fullname must be at least 3 characters long"),
    phoneNumber: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The user phone number is required"
                    : "The user phone number must be a string",
        })
        .min(10, "The user phone number must be at least 10 characters long"),
    email: z.email({
        error: (iss) =>
            iss.input == undefined
                ? "The user email is required"
                : "The user email must be a valid email address",
    }),
    role: z.enum(["admin", "teacher", "student", "parent"], {
        error: (iss) =>
            iss.input == undefined
                ? "The user role is required"
                : "The user role must be one of the following: admin, teacher, student, or parent",
    }),
    password: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The user password is required"
                    : "The user password must be a string",
        })
        .min(8, "The user password must be at least 8 characters long"),
});
