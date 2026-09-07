import mongoose from "mongoose";
import { z } from "zod";

export const guardianSchema = z
    .object({
        studentId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The student ID is required"
                        : "The student ID must be a string",
            }),
        }),
        parentId: z.string({
            error: (iss) => ({
                message:
                    iss.input == undefined
                        ? "The parent ID is required"
                        : "The parent ID must be a string",
            }),
        }),
    })
    .superRefine(({ studentId, parentId }, ctx) => {
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid student ID",
                path: ["studentId"],
            });
        }

        if (!mongoose.Types.ObjectId.isValid(parentId)) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid parent ID",
                path: ["parentId"],
            });
        }
    });
