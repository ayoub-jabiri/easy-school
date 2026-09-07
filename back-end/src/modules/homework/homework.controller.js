import { excludeUserPassword } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import {
    deleteHomeworkService,
    getAllHomeworksService,
    getHomeworkByIdService,
    getHomeworkClassService,
    getHomeworkTeacherService,
    registerHomeworkService,
    updateHomeworkService,
} from "./homework.service.js";

export const getHomeworks = async (req, res) => {
    try {
        const currentPage = +req?.query?.page || 1;
        const homeworksLimit = +req?.query?.limit || 15;
        const homeworksToSkip = (currentPage - 1) * homeworksLimit;

        const user = req.user;

        const homeworks = await getAllHomeworksService(
            user,
            homeworksLimit,
            homeworksToSkip
        );

        res.json({
            currentPage,
            homeworksPerPage: homeworksLimit,
            homeworks,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerHomework = async (req, res) => {
    try {
        const { title, description, dueDate, classId } = req.body;

        const newHomework = await registerHomeworkService({
            title,
            description,
            dueDate: new Date(dueDate),
            teacherId: req.user.id,
            classId,
        });

        res.status(201).json({
            message: "Homework has been registered successfully",
            homework: newHomework,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getSingleHomework = async (req, res) => {
    try {
        const homework = await getHomeworkByIdService(req.params.homeworkId);

        res.json({ homework });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateHomework = async (req, res) => {
    try {
        const homework = await updateHomeworkService(
            req.params.homeworkId,
            req.body
        );

        res.json({
            message: "Homework has been updated successfully",
            homework,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const deleteHomework = async (req, res) => {
    try {
        await deleteHomeworkService(req.params.homeworkId);

        res.json({
            message: "Homework has been deleted successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getHomeworkClass = async (req, res) => {
    try {
        const currentClass = await getHomeworkClassService(
            req.params.homeworkId
        );

        res.json({ class: currentClass });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getHomeworkTeacher = async (req, res) => {
    try {
        const teacher = await getHomeworkTeacherService(req.params.homeworkId);

        res.json({ teacher: excludeUserPassword(teacher) });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
