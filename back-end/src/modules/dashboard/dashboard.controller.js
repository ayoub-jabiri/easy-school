import { serverErrorResponse } from "../../utils/server.error.js";
import { getAdminDashboardService } from "./dashboard.service.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const dashboard = await getAdminDashboardService();

        res.json(dashboard);
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
