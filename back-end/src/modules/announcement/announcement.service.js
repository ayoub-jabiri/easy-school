import Announcement from "./announcement.model.js";

export const getAllAnnouncementsService = async ({
    limit,
    skip,
    search,
    startDate,
    endDate,
}) => {
    const andConditions = [];

    if (search && search.trim()) {
        const regex = new RegExp(search.trim(), "i");

        andConditions.push({
            $or: [{ title: regex }, { description: regex }],
        });
    }

    if (startDate || endDate) {
        const createdAtFilter = {};

        if (startDate) {
            createdAtFilter.$gte = new Date(startDate);
        }

        if (endDate) {
            createdAtFilter.$lte = new Date(endDate);
        }

        andConditions.push({ createdAt: createdAtFilter });
    }

    const filter = andConditions.length ? { $and: andConditions } : {};

    const [announcements, totalAnnouncements] = await Promise.all([
        Announcement.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        Announcement.countDocuments(filter),
    ]);

    return { announcements, totalAnnouncements };
};

export const getAnnouncementByIdService = async (id) =>
    await Announcement.findById(id);

export const createAnnouncementService = async (announcementData) =>
    await Announcement.create(announcementData);

export const updateAnnouncementService = async (id, announcementData) => {
    const announcement = await getAnnouncementByIdService(id);

    announcement.title = announcementData.title;
    announcement.description = announcementData.description;

    return await announcement.save();
};

export const deleteAnnouncementService = async (id) =>
    await Announcement.findByIdAndDelete(id);
