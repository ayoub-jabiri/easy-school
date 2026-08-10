import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getSubjectByTitle } from "./subject.service.js";
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

export const subjectExistCheck = async (req, res, next) => {
    try {
        const { title } = req.body;

        const existingSubject = await getSubjectByTitle(title.toLowerCase());

        if (existingSubject) {
            return clientErrorResponse(
                res,
                400,
                "Subject already exists with this title"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
