import { serverErrorResponse } from "../../utils/server.error.js";
import { getAdminUsersService } from "./dashboard.service.js";
import { getAdminDashboardService } from "./dashboard.service.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const dashboard = await getAdminDashboardService();

        res.json(dashboard);
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getAdminUsers = async (req, res) => {
    try {
        const { page = 1, limit = 15, search = "", role = "" } = req.query;

        const currentPage = +page;
        const usersLimit = +limit;

        const { users, totalUsers } = await getAdminUsersService({
            page: currentPage,
            limit: usersLimit,
            search,
            role,
        });

        res.json({
            currentPage,
            usersPerPage: usersLimit,
            totalUsers,
            users,
        });
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
