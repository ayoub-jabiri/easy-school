import SchoolRoom from "./room.model.js";

export const getSchoolRoomsService = async (limit, skip) =>
    await SchoolRoom.find().limit(limit).skip(skip);

export const getSchoolRoomByIdService = async (roomId) =>
    await SchoolRoom.findById(roomId);
