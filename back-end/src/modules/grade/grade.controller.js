import { excludeUserPassword } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { registerGradeService } from "./grade.service.js";
import {
    deleteGradeService,
    getAllGradesService,
    getGradeByIdService,
    getGradeStudentService,
    getGradeTeacherService,
    updateGradeService,
} from "./grade.service.js";

export const getGrades = async (req, res) => {
    try {
        const currentPage = +req?.query?.page || 1;
        const gradesLimit = +req?.query?.limit || 15;
        const gradesToSkip = (currentPage - 1) * gradesLimit;

        const user = req.user;

        const grades = await getAllGradesService(
            user,
            gradesLimit,
            gradesToSkip
        );

        res.json({ currentPage, gradesPerPage: gradesLimit, grades });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerGrade = async (req, res) => {
    try {
        const { grade, evaluation, studentId, classId } = req.body;

        const newGrade = await registerGradeService({
            grade,
            evaluation,
            studentId,
            teacherId: req.user.id,
            classId,
        });

        res.status(201).json({
            message: "Grade has been registered successfully",
            grade: newGrade,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getSingleGrade = async (req, res) => {
    try {
        const grade = await getGradeByIdService(req.params.gradeId);

        res.json({ grade });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateGrade = async (req, res) => {
    try {
        const grade = await updateGradeService(req.params.gradeId, req.body);

        res.json({
            message: "Grade has been updated successfully",
            grade,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const deleteGrade = async (req, res) => {
    try {
        await deleteGradeService(req.params.gradeId);

        res.json({
            message: "Grade has been deleted successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getGradeStudent = async (req, res) => {
    try {
        const student = await getGradeStudentService(req.params.gradeId);

        res.json({ student: excludeUserPassword(student) });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getGradeTeacher = async (req, res) => {
    try {
        const teacher = await getGradeTeacherService(req.params.gradeId);

        res.json({ teacher: excludeUserPassword(teacher) });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
