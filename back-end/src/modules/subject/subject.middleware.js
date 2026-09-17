import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getSubjectById, getSubjectByTitle } from "./subject.service.js";
import { subjectSchema } from "./subject.validation.js";

export const subjectDataValidation = (req, res, next) => {
    try {
        const { title } = req.body;

        subjectSchema.parse({ title });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const subjectExistsCheck = async (req, res, next) => {
    try {
        const { subjectId } = req.params;

        const subject = await getSubjectById(subjectId);

        if (!subject) {
            return clientErrorResponse(res, 404, "Subject not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const subjectAlreadyExistCheck = async (req, res, next) => {
    try {
        const { title } = req.body;

        const existingSubject = await getSubjectByTitle(title.toLowerCase());

        if (existingSubject) {
            return clientErrorResponse(
                res,
                409,
                "Subject already exists with this title"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const subjectDeleteCheck = async (req, res, next) => {
    try {
        const { subjectId } = req.params;
        const subject = await getSubjectById(subjectId);

        if (subject.classes.length > 0) {
            return clientErrorResponse(
                res,
                400,
                "Cannot delete subject with associated classes"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
