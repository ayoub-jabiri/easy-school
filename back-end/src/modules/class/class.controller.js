import { getClassesService } from "./class.service.js";
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
        res.status(201).json({
            message: "School room has been registered successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
