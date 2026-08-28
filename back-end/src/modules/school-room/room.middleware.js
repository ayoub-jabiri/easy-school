import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import {
    getSchoolRoomByIdService,
    getSchoolRoomByRoomNumberService,
} from "./room.service.js";
import { schoolRoomSchema } from "./room.validation.js";

export const schoolRoomDataValidation = (req, res, next) => {
    try {
        const { roomNumber } = req.body;

        schoolRoomSchema.parse({ roomNumber });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const schoolRoomExistsCheck = async (req, res, next) => {
    try {
        const { schoolRoomId } = req.params;

        const schoolRoom = await getSchoolRoomByIdService(schoolRoomId);

        if (!schoolRoom) {
            return clientErrorResponse(res, 404, "School room not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const schoolRoomNumberExistsCheck = async (req, res, next) => {
    try {
        const { roomNumber } = req.body;

        const schoolRoom = await getSchoolRoomByRoomNumberService(roomNumber);

        if (schoolRoom) {
            return clientErrorResponse(
                res,
                400,
                "School room already registered"
            );
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
