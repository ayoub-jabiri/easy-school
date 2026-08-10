import { serverErrorResponse } from "../../utils/server.error.js";
import {
    createSubject,
    getAllSubjects,
    getSubjectById,
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
