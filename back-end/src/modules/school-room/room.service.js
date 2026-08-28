import SchoolRoom from "./room.model.js";

export const getSchoolRoomsService = async (limit, skip) =>
    await SchoolRoom.find().limit(limit).skip(skip);

export const getSchoolRoomByRoomNumberService = async (roomNumber) =>
    await SchoolRoom.findOne({ roomNumber });

export const getSchoolRoomByIdService = async (roomId) =>
    await SchoolRoom.findById(roomId);

export const registerSchoolRoomService = async (roomData) =>
    await SchoolRoom.create(roomData);
