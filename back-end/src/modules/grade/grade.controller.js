import { serverErrorResponse } from "../../utils/server.error.js";
import {
    getGradeDetailsService,
    registerGradeService,
} from "./grade.service.js";
import {
    deleteGradeService,
    getAllGradesService,
    getGradeByIdService,
    updateGradeService,
} from "./grade.service.js";

export const getGrades = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 15,
            search = "",
            classId = "",
            studentId = "",
            subjectId = "",
        } = req.query;

        const currentPage = +page;
        const gradesLimit = +limit;

        const { grades, totalGrades } = await getAllGradesService({
            user: req.user,
            page: currentPage,
            limit: gradesLimit,
            search,
            classId,
            studentId,
            subjectId,
        });

        res.json({
            currentPage,
            gradesPerPage: gradesLimit,
            totalPages: Math.ceil(totalGrades / gradesLimit) || 1,
            totalGrades,
            grades,
        });
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
        const grade = await getGradeDetailsService(req.params.gradeId);

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
