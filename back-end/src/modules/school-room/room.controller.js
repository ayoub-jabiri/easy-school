import { serverErrorResponse } from "../../utils/server.error.js";
import {
    deleteSchoolRoomService,
    getSchoolRoomByIdService,
    getSchoolRoomsService,
    registerSchoolRoomService,
    updateSchoolRoomService,
} from "./room.service.js";

export const getSchoolRooms = async (req, res) => {
    try {
        const { page = 1, limit = 15, search = "" } = req.query;

        const currentPage = +page;
        const roomsLimit = +limit;

        const { rooms, totalRooms } = await getSchoolRoomsService({
            page: currentPage,
            limit: roomsLimit,
            search,
        });

        res.json({
            currentPage,
            roomsPerPage: roomsLimit,
            totalPages: Math.ceil(totalRooms / roomsLimit) || 1,
            totalRooms,
            rooms,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerSchoolRoom = async (req, res) => {
    try {
        const { title, roomNumber } = req.body;

        const schoolRoom = await registerSchoolRoomService({
            title,
            roomNumber,
        });

        res.status(201).json({
            message: "School room has been registered successfully",
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

        res.json({
            message: "School room has been updated successfully",
            schoolRoom,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const deleteSchoolRoom = async (req, res) => {
    try {
        await deleteSchoolRoomService(req.params.schoolRoomId);

        res.json({
            message: "School room has been deleted successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
