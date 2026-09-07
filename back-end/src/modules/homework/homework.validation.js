import mongoose from "mongoose";
import { z } from "zod";

export const homeworkSchema = z
    .object({
        title: z
            .string({
                error: (iss) =>
                    iss.input == undefined
                        ? "The homework title is required"
                        : "The homework title must be a string",
            })
            .min(3, "The homework title must be at least 3 characters long"),
        description: z.string({
            error: (iss) =>
                iss.input == undefined
                    ? "The homework description is required"
                    : "The homework description must be a string",
        }),
        dueDate: z
            .string({
                error: (iss) =>
                    iss.input == undefined
                        ? "The due date is required"
                        : "The due date must be a string",
            })
            .refine(
                (value) => !isNaN(Date.parse(value)),
                "The due date must be a valid date"
            ),
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
    .superRefine(({ teacherId, classId }, ctx) => {
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

export const updateHomeworkSchema = z.object({
    title: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The homework title is required"
                    : "The homework title must be a string",
        })
        .min(3, "The homework title must be at least 3 characters long"),
    description: z.string({
        error: (iss) =>
            iss.input == undefined
                ? "The homework description is required"
                : "The homework description must be a string",
    }),
    dueDate: z
        .string({
            error: (iss) =>
                iss.input == undefined
                    ? "The due date is required"
                    : "The due date must be a string",
        })
        .refine(
            (value) => !isNaN(Date.parse(value)),
            "The due date must be a valid date"
        ),
});
