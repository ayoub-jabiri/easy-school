import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getClassByIdService } from "../class/class.service.js";
import { getGuardiansByQuery } from "../guardian/guardian.service.js";
import { getUserByIdService } from "../users/user.service.js";
import {
    getGradeByIdService,
    getGradeByQueryService,
} from "./grade.service.js";
import { gradeSchema, updateGradeSchema } from "./grade.validation.js";

export const gradeDataValidation = (req, res, next) => {
    try {
        const { grade, evaluation, studentId, classId } = req.body;

        gradeSchema.parse({
            grade,
            evaluation,
            studentId,
            teacherId: req.user.id,
            classId,
        });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateGradeDataValidation = (req, res, next) => {
    try {
        const { grade, evaluation } = req.body;

        updateGradeSchema.parse({ grade, evaluation });

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

export const studentCheck = async (req, res, next) => {
    try {
        const { studentId, classId } = req.body;

        const student = await getUserByIdService(studentId);

        if (!student) {
            return clientErrorResponse(res, 404, "Student not found");
        }

        if (student?.role !== "student") {
            return clientErrorResponse(res, 400, "The user is not a student");
        }

        const currentClass = await getClassByIdService(classId);

        if (!currentClass.students.includes(studentId)) {
            return clientErrorResponse(
                res,
                400,
                "You can't register a grade for this student because he is not registered in this class"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const gradeExistsCheck = async (req, res, next) => {
    try {
        const { gradeId } = req.params;

        const grade = await getGradeByIdService(gradeId);

        if (!grade) {
            return clientErrorResponse(res, 404, "Grade not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const gradeAccessCheck = async (req, res, next) => {
    try {
        const { gradeId } = req.params;

        const grade = await getGradeByIdService(gradeId);

        if (
            req.user.role === "teacher" &&
            grade.teacherId.toString() !== req.user.id
        ) {
            return clientErrorResponse(
                res,
                403,
                "You don't have permission to access this grade"
            );
        }

        if (
            req.user.role === "student" &&
            grade.studentId.toString() !== req.user.id
        ) {
            return clientErrorResponse(
                res,
                403,
                "You don't have permission to access this grade"
            );
        }

        if (req.user.role === "parent") {
            const studentsIds = (
                await getGuardiansByQuery({
                    parentId: req.user.id,
                })
            ).map((guardian) => guardian.studentId);

            const currentGrade = await getGradeByQueryService({
                _id: grade._id,
                studentId: { $in: studentsIds },
            });

            if (!currentGrade) {
                return clientErrorResponse(
                    res,
                    403,
                    "You don't have permission to access this grade"
                );
            }
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
