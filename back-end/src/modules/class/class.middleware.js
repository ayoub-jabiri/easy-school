import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getSchoolRoomByIdService } from "../school-room/room.service.js";
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
