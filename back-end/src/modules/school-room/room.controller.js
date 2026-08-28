import { serverErrorResponse } from "../../utils/server.error.js";
import {
    getSchoolRoomByIdService,
    getSchoolRoomsService,
    registerSchoolRoomService,
    updateSchoolRoomService,
} from "./room.service.js";

export const getSchoolRooms = async (req, res) => {
    try {
        const currentPage = +req?.query?.page || 1;
        const roomsLimit = +req?.query?.limit || 15;
        const roomsToSkip = (currentPage - 1) * roomsLimit;

        const schoolRooms = await getSchoolRoomsService(
            roomsLimit,
            roomsToSkip
        );

        res.json({ currentPage, roomsPerPage: roomsLimit, schoolRooms });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerSchoolRoom = async (req, res) => {
    try {
        const { roomNumber } = req.body;

        const schoolRoom = await registerSchoolRoomService({
            roomNumber,
        });

        res.status(201).json({
            message: "School room registered successfully",
            schoolRoom,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getSingleSchoolRoom = async (req, res) => {
    try {
        const schoolRoom = await getSchoolRoomByIdService(
            req.params.schoolRoomId
        );

        res.json({ schoolRoom });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateSchoolRoom = async (req, res) => {
    try {
        const schoolRoom = await updateSchoolRoomService(
            req.params.schoolRoomId,
            req.body
        );

        res.json({ message: "School room updated successfully", schoolRoom });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

// export const deleteSubject = async (req, res) => {
//     try {
//         await deleteSubjectService(req.params.subjectId);

//         res.json({
//             message: "Subject has been deleted successfully",
//         });
//     } catch (error) {
//         serverErrorResponse(res, error);
//     }
// };
