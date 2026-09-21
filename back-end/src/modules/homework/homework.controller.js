import { serverErrorResponse } from "../../utils/server.error.js";
import {
    deleteHomeworkService,
    getAllHomeworksService,
    getHomeworkByIdService,
    getSingleHomeworkService,
    registerHomeworkService,
    updateHomeworkService,
} from "./homework.service.js";

export const getHomeworks = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 15,
            search = "",
            classId = "",
            status = "",
        } = req.query;

        const currentPage = +page;
        const homeworksLimit = +limit;

        const { homeworks, totalHomeworks } = await getAllHomeworksService({
            user: req.user,
            page: currentPage,
            limit: homeworksLimit,
            search,
            classId,
            status,
        });

        res.json({
            currentPage,
            homeworksPerPage: homeworksLimit,
            totalPages: Math.ceil(totalHomeworks / homeworksLimit) || 1,
            totalHomeworks,
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
        const homework = await getSingleHomeworkService(req.params.homeworkId);

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
