import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getSchoolRoomByIdService } from "../school-room/room.service.js";
import { getClassByIdService, getClassByQuery } from "./class.service.js";
import { classSchema } from "./class.validation.js";

export const classDataValidation = (req, res, next) => {
    try {
        const { subjectTitle, level, levelYear, schoolRoomId } = req.body;

        classSchema.parse({ subjectTitle, level, levelYear, schoolRoomId });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const classAlreadyExistsCheck = async (req, res, next) => {
    try {
        const { subjectTitle, level, levelYear } = req.body;

        const schoolRoom = await getClassByQuery({
            subjectTitle: subjectTitle.toLowerCase(),
            level,
            levelYear,
        });

        if (schoolRoom) {
            return clientErrorResponse(res, 409, "Class already registered");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const schoolRoomExistsCheck = async (req, res, next) => {
    try {
        const { schoolRoomId } = req.body;

        const schoolRoom = await getSchoolRoomByIdService(schoolRoomId);

        if (!schoolRoom) {
            return clientErrorResponse(res, 404, "School room not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const classExistsCheck = async (req, res, next) => {
    try {
        const { classId } = req.params;

        const currentClass = await getClassByIdService(classId);

        if (!currentClass) {
            return clientErrorResponse(res, 404, "Class not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
