import mongoose from "mongoose";
import { z } from "zod";

export const classSchema = z
    .object({
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
        group: z
            .number({
                error: (iss) => ({
                    message:
                        iss.input == undefined
                            ? "The class group number is required"
                            : "The class group number must be a number",
                }),
            })
            .min(1, {
                message: "The class group number must be at least 1",
            }),
        schoolRoomId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The school room ID is required"
                        : "The school room ID must be a string",
            }),
        }),
        subjectId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The subject ID is required"
                        : "The subject ID must be a string",
            }),
        }),
    })
    .superRefine(({ level, levelYear, schoolRoomId, subjectId }, ctx) => {
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
                message: "Invalid school room",
                path: ["schoolRoomId"],
            });
        }

        if (!mongoose.Types.ObjectId.isValid(subjectId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid subject",
                path: ["subjectId"],
            });
        }
    });

export const assignTeacherSchema = z
    .object({
        teacherId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The teacher ID is required"
                        : "The teacher ID must be a string",
            }),
        }),
    })
    .superRefine(({ teacherId }, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid teacher",
                path: ["teacherId"],
            });
        }
    });

export const studentRegistrationSchema = z
    .object({
        studentId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The student ID is required"
                        : "The student ID must be a string",
            }),
        }),
    })
    .superRefine(({ studentId }, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid student",
                path: ["studentId"],
            });
        }
    });
