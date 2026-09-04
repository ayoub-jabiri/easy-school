import { clientErrorResponse } from "../../utils/client.responses.js";
import { serverErrorResponse } from "../../utils/server.error.js";
import { getAnnouncementByIdService } from "./announcement.service.js";
import { announcementSchema } from "./announcement.validation.js";

export const announcementDataValidation = (req, res, next) => {
    try {
        const { title, description } = req.body;

        announcementSchema.parse({ title, description });

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const announcementExistsCheck = async (req, res, next) => {
    try {
        const { announcementId } = req.params;

        const announcement = await getAnnouncementByIdService(announcementId);

        if (!announcement) {
            return clientErrorResponse(res, 404, "Announcement not found");
        }

        next();
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
