import {
    deleteClassService,
    getClassByIdService,
    getClassesService,
    handleStudentRegistrationService,
    handleTeacherAssignmentService,
    registerClassService,
    updateClassService,
} from "./class.service.js";
import { serverErrorResponse } from "../../utils/server.error.js";

export const getClasses = async (req, res) => {
    try {
        const currentPage = +req?.query?.page || 1;
        const classesLimit = +req?.query?.limit || 15;
        const classesToSkip = (currentPage - 1) * classesLimit;

        const classes = await getClassesService(classesLimit, classesToSkip);

        res.json({ currentPage, classesPerPage: classesLimit, classes });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerClass = async (req, res) => {
    try {
        const { subjectTitle, level, levelYear, schoolRoomId } = req.body;

        const newClass = await registerClassService({
            subjectTitle: subjectTitle.toLowerCase(),
            level,
            levelYear,
            schoolRoomId,
        });

        res.status(201).json({
            message: "Class has been registered successfully",
            class: newClass,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getSingleClass = async (req, res) => {
    try {
        const currentClass = await getClassByIdService(req.params.classId);

        res.json({ class: currentClass });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateClass = async (req, res) => {
    try {
        const currentClass = await updateClassService(
            req.params.classId,
            req.body
        );

        res.json({
            message: "Class has been updated successfully",
            class: currentClass,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const deleteClass = async (req, res) => {
    try {
        await deleteClassService(req.params.classId);

        res.json({
            message: "Class has been deleted successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const assignTeacherToClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const { teacherId } = req.body;

        const currentClass = await handleTeacherAssignmentService(
            "assign",
            classId,
            teacherId
        );

        res.json({
            message: "The teacher has been assigned to the class successfully",
            class: currentClass,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const unassignTeacherToClass = async (req, res) => {
    try {
        const { classId } = req.params;

        const currentClass = await handleTeacherAssignmentService(
            "unassign",
            classId
        );

        res.json({
            message:
                "The teacher has been unassigned from the class successfully",
            class: currentClass,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerStudentToClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const { studentId } = req.body;

        const currentClass = await handleStudentRegistrationService(
            "register",
            classId,
            studentId
        );

        res.json({
            message:
                "The student has been registered to the class successfully",
            class: currentClass,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const unregisterStudentToClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const { studentId } = req.body;

        const currentClass = await handleStudentRegistrationService(
            "unregister",
            classId,
            studentId
        );

        res.json({
            message:
                "The student has been unregistered from the class successfully",
            class: currentClass,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
