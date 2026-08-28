import SchoolRoom from "./room.model.js";

export const getSchoolRoomsService = async (limit, skip) =>
    await SchoolRoom.find().limit(limit).skip(skip);

export const getSchoolRoomByRoomNumberService = async (roomNumber) =>
    await SchoolRoom.findOne({ roomNumber });

export const getSchoolRoomByIdService = async (roomId) =>
    await SchoolRoom.findById(roomId);

export const registerSchoolRoomService = async (roomData) =>
    await SchoolRoom.create(roomData);

export const updateSchoolRoomService = async (roomId, roomData) => {
    const schoolRoom = await SchoolRoom.findById(roomId);

    schoolRoom.roomNumber = roomData.roomNumber;

    return await schoolRoom.save();
};

export const deleteSchoolRoomService = async (roomId) =>
    await SchoolRoom.findByIdAndDelete(roomId);
