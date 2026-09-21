import { serverErrorResponse } from "../../utils/server.error.js";
import {
    createAnnouncementService,
    deleteAnnouncementService,
    getAllAnnouncementsService,
    getAnnouncementByIdService,
    updateAnnouncementService,
} from "./announcement.service.js";

export const getAnnouncements = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 15,
            search = "",
            startDate = "",
            endDate = "",
        } = req.query;

        const currentPage = +page;
        const announcementsLimit = +limit;
        const announcementsToSkip = (currentPage - 1) * announcementsLimit;

        const { announcements, totalAnnouncements } =
            await getAllAnnouncementsService({
                limit: announcementsLimit,
                skip: announcementsToSkip,
                search,
                startDate,
                endDate,
            });

        res.json({
            currentPage,
            announcementsPerPage: announcementsLimit,
            totalPages: Math.ceil(totalAnnouncements / announcementsLimit) || 1,
            totalAnnouncements,
            announcements,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const registerAnnouncement = async (req, res) => {
    try {
        const { title, description } = req.body;

        const announcement = await createAnnouncementService({
            title,
            description,
        });

        res.status(201).json({
            message: "Announcement has been registered successfully",
            announcement,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getSingleAnnouncement = async (req, res) => {
    try {
        const announcement = await getAnnouncementByIdService(
            req.params.announcementId
        );

        res.json({ announcement });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const updateAnnouncement = async (req, res) => {
    try {
        const announcement = await updateAnnouncementService(
            req.params.announcementId,
            req.body
        );

        res.json({
            message: "Announcement has been updated successfully",
            announcement,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const deleteAnnouncement = async (req, res) => {
    try {
        await deleteAnnouncementService(req.params.announcementId);

        res.json({
            message: "Announcement has been deleted successfully",
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
