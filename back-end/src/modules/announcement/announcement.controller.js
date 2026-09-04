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
        const currentPage = +req?.query?.page || 1;
        const announcementsLimit = +req?.query?.limit || 15;
        const announcementsToSkip = (currentPage - 1) * announcementsLimit;

        const announcements = await getAllAnnouncementsService(
            announcementsLimit,
            announcementsToSkip
        );

        res.json({
            currentPage,
            announcementsPerPage: announcementsLimit,
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
