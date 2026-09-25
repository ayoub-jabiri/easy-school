import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import {
    getClassByIdService,
    getClassesByQuery,
} from "../class/class.service.js";
import { getGuardiansByQuery } from "../guardian/guardian.service.js";
import { getUserByIdService } from "../users/user.service.js";
import { getHomeworkByIdService } from "./homework.service.js";
import { homeworkSchema, updateHomeworkSchema } from "./homework.validation.js";

export const homeworkDataValidation = (req, res, next) => {
    try {
        const { title, description, dueDate, classId } = req.body;

        homeworkSchema.parse({
            title,
            description,
            dueDate,
            teacherId: req.user.id,
            classId,
        });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateHomeworkDataValidation = (req, res, next) => {
    try {
        const { title, description, dueDate } = req.body;

        updateHomeworkSchema.parse({ title, description, dueDate });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const teacherCheck = async (req, res, next) => {
    try {
        const teacher = await getUserByIdService(req.user.id);

        if (!teacher) {
            return clientErrorResponse(res, 404, "Teacher not found");
        }

        if (teacher?.role !== "teacher") {
            return clientErrorResponse(res, 400, "The user is not a teacher");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const classCheck = async (req, res, next) => {
    try {
        const { classId } = req.body;

        const currentClass = await getClassByIdService(classId);

        if (!currentClass) {
            return clientErrorResponse(res, 404, "Class not found");
        }

        if (currentClass?.teacherId.toString() !== req.user.id) {
            return clientErrorResponse(
                res,
                400,
                "You don't have permission to access this class"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const homeworkExistsCheck = async (req, res, next) => {
    try {
        const { homeworkId } = req.params;

        const homework = await getHomeworkByIdService(homeworkId);

        if (!homework) {
            return clientErrorResponse(res, 404, "Homework not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const homeworkAccessCheck = async (req, res, next) => {
    try {
        const { homeworkId } = req.params;

        const homework = await getHomeworkByIdService(homeworkId);

        if (
            req.user.role === "teacher" &&
            homework.teacherId.toString() !== req.user.id
        ) {
            return clientErrorResponse(
                res,
                403,
                "You don't have permission to access this homework"
            );
        }

        if (req.user.role === "student") {
            const currentClass = await getClassByIdService(homework.classId);

            if (!currentClass.students.includes(req.user.id)) {
                return clientErrorResponse(
                    res,
                    403,
                    "You don't have permission to access this homework"
                );
            }
        }

        if (req.user.role === "parent") {
            const studentsIds = (
                await getGuardiansByQuery({
                    parentId: req.user.id,
                })
            ).map((guardian) => guardian.studentId);

            const currentClass = await getClassesByQuery({
                _id: homework.classId,
                students: { $in: studentsIds },
            });

            if (!currentClass) {
                return clientErrorResponse(
                    res,
                    403,
                    "You don't have permission to access this homework"
                );
            }
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
