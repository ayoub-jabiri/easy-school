import { serverErrorResponse } from "../../utils/server.error.js";
import {
    createSubject,
    deleteSubjectService,
    getAllSubjects,
    getSubjectById,
    updateSubjectService,
} from "./subject.service.js";

export const getSubjects = async (req, res) => {
    try {
        const { page = 1, limit = 15, search = "", role = "" } = req.query;

        const currentPage = +page;
        const subjectsLimit = +limit;

        const { subjects, totalSubjects } = await getAllSubjects({
            page: currentPage,
            limit: subjectsLimit,
            search,
        });

        res.json({
            currentPage,
            subjectsPerPage: subjectsLimit,
            totalPages: Math.ceil(totalSubjects / subjectsLimit),
            totalSubjects,
            subjects,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerSubject = async (req, res) => {
    try {
        const subject = await createSubject({
            title: req.body.title.toLowerCase(),
        });

        res.status(201).json({
            message: "Subject registered successfully",
            subject: subject,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getSingleSubject = async (req, res) => {
    try {
        const subject = await getSubjectById(req.params.subjectId);

        res.json({ subject });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateSubject = async (req, res) => {
    try {
        const subject = await updateSubjectService(
            req.params.subjectId,
            req.body.title.toLowerCase()
        );

        res.json({ message: "Subject updated successfully", subject });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const deleteSubject = async (req, res) => {
    try {
        await deleteSubjectService(req.params.subjectId);

        res.json({
            message: "Subject has been deleted successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
