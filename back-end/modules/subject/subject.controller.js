import { serverErrorResponse } from "../../utils/server.error.js";
import { getAllSubjects } from "./subject.service.js";

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
