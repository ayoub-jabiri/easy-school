import { getClassesService, registerClassService } from "./class.service.js";
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
