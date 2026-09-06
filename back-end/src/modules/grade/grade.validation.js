import mongoose from "mongoose";
import { z } from "zod";

export const gradeSchema = z
    .object({
        grade: z
            .number({
                error: (iss) =>
                    iss.input == undefined
                        ? "The grade is required"
                        : "The grade must be a number",
            })
            .min(0, "The grade must be at least 0")
            .max(20, "The grade must be at most 20"),
        evaluation: z.string({
            error: (iss) =>
                iss.input == undefined
                    ? "The evaluation is required"
                    : "The evaluation must be a string",
        }),
        studentId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The student ID is required"
                        : "The student ID must be a string",
            }),
        }),
        teacherId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The teacher ID is required"
                        : "The teacher ID must be a string",
            }),
        }),
        classId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The class ID is required"
                        : "The class ID must be a string",
            }),
        }),
    })
    .superRefine(({ studentId, teacherId, classId }, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid student ID",
                path: ["studentId"],
            });
        }

        if (!mongoose.Types.ObjectId.isValid(teacherId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid teacher ID",
                path: ["teacherId"],
            });
        }

        if (!mongoose.Types.ObjectId.isValid(classId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid class ID",
                path: ["classId"],
            });
        }
    });

export const updateGradeSchema = z.object({
    grade: z
        .number({
            error: (iss) =>
                iss.input == undefined
                    ? "The grade is required"
                    : "The grade must be a number",
        })
        .min(0, "The grade must be at least 0")
        .max(20, "The grade must be at most 20"),
    evaluation: z.string({
        error: (iss) =>
            iss.input == undefined
                ? "The evaluation is required"
                : "The evaluation must be a string",
    }),
});
