import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
} from "../../middlewares/global.middlewares.js";
import {
    getAdminDashboard,
    getStudentDashboard,
    getTeacherDashboard,
} from "./dashboard.controller.js";

const router = Router();

router.use(authenticationCheck);

router.get("/admin/stats", authorizationCheck(["admin"]), getAdminDashboard);
router.get(
    "/teacher/stats",
    authorizationCheck(["teacher"]),
    getTeacherDashboard
);
router.get(
    "/student/stats",
    authorizationCheck(["student"]),
    getStudentDashboard
);

export default router;
