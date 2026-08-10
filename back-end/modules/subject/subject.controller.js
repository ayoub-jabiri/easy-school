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
        const currentPage = +req?.query?.page || 1;
        const invoicesLimit = +req?.query?.limit || 15;
        const invoicesToSkip = (currentPage - 1) * invoicesLimit;

        const subjects = await getAllSubjects(invoicesLimit, invoicesToSkip);

        res.json({ currentPage, invoicesPerPage: invoicesLimit, subjects });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerSubject = async (req, res) => {
    try {
        const subject = await createSubject({
            title: req.body.title.toLowerCase(),
        });

        res.json({
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

        res.json({ subject });
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
