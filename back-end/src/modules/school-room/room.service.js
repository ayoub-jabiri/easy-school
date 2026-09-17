import SchoolRoom from "./room.model.js";

export const getSchoolRoomsService = async ({ page, limit, search }) => {
    const skip = (page - 1) * limit;

    const filter = {};

    if (search.trim()) {
        if (!isNaN(+search.trim())) {
            filter.roomNumber = +search.trim();
        } else {
            const regex = new RegExp(search.trim(), "i");

            filter.title = regex;
        }
    }

    const [rooms, totalRooms] = await Promise.all([
        SchoolRoom.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

        SchoolRoom.countDocuments(filter),
    ]);

    return {
        rooms,
        totalRooms,
    };
};

export const getSchoolRoomByRoomNumberService = async (roomNumber) =>
    await SchoolRoom.findOne({ roomNumber });

export const getSchoolRoomByIdService = async (roomId) =>
    await SchoolRoom.findById(roomId);

export const registerSchoolRoomService = async (roomData) =>
    await SchoolRoom.create(roomData);

export const updateSchoolRoomService = async (roomId, roomData) => {
    const schoolRoom = await SchoolRoom.findById(roomId);

    schoolRoom.title = roomData.title;
    schoolRoom.roomNumber = roomData.roomNumber;

    return await schoolRoom.save();
};

export const deleteSchoolRoomService = async (roomId) =>
    await SchoolRoom.findByIdAndDelete(roomId);
