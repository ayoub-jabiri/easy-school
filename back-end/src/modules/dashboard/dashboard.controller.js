import { serverErrorResponse } from "../../utils/server.error.js";
import {
    getAdminDashboardService,
    getParentDashboardService,
    getStudentDashboardService,
    getTeacherDashboardService,
} from "./dashboard.service.js";

export const getAdminDashboard = async (req, res) => {
    try {
        const dashboard = await getAdminDashboardService();

        res.json(dashboard);
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getTeacherDashboard = async (req, res) => {
    try {
        const dashboard = await getTeacherDashboardService(req.user.id);

        res.json(dashboard);
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getStudentDashboard = async (req, res) => {
    try {
        const dashboard = await getStudentDashboardService(req.user.id);

        res.json(dashboard);
    } catch (error) {
        serverErrorResponse(res, error);
    }
};

export const getParentDashboard = async (req, res) => {
    try {
        const dashboard = await getParentDashboardService(req.user.id);

        res.json(dashboard);
    } catch (error) {
        serverErrorResponse(res, error);
    }
};
