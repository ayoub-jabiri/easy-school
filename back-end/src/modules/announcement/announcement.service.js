import Announcement from "./announcement.model.js";

export const getAllAnnouncementsService = async (
    announcementsLimit,
    announcementsToSkip
) =>
    await Announcement.find()
        .limit(announcementsLimit)
        .skip(announcementsToSkip);

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
