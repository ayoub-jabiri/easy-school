import mongoose from "mongoose";
import { z } from "zod";

export const classSchema = z
    .object({
        subjectTitle: z.string({
            error: (iss) =>
                iss.input == undefined
                    ? "The subject title is required"
                    : "The subject title must be a string",
        }),
        level: z.enum(["primary", "middle", "high"], {
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The school level is required"
                        : typeof iss.input == "string"
                        ? "The school level must be one of the following: primary, middle, or high"
                        : "The school level must be a string",
            }),
        }),
        levelYear: z.number({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The school level year is required"
                        : "The school level year must be a number",
            }),
        }),
        schoolRoomId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The school room ID is required"
                        : "The school room ID must be a string",
            }),
        }),
    })
    .superRefine(({ level, levelYear, schoolRoomId }, ctx) => {
        if (level == "primary") {
            if (![1, 2, 3, 4, 5, 6].includes(levelYear)) {
                ctx.addIssue({
                    code: "custom",
                    message:
                        "Invalid year of the selected school level: must be between 1 and 6",
                    path: ["levelYear"],
                });
            }
        }

        if (level == "middle" || level == "high") {
            if (![1, 2, 3].includes(levelYear)) {
                ctx.addIssue({
                    code: "custom",
                    message:
                        "Invalid year of the selected school level: must be between 1 and 3",
                    path: ["levelYear"],
                });
            }
        }

        if (!mongoose.Types.ObjectId.isValid(schoolRoomId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid school room ID",
                path: ["schoolRoomId"],
            });
        }
    });
