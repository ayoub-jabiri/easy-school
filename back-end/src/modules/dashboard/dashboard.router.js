import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
} from "../../middlewares/global.middlewares.js";
import { getAdminDashboard } from "./dashboard.controller.js";

const router = Router();

router.use(authenticationCheck);

router.get("/admin/stats", authorizationCheck(["admin"]), getAdminDashboard);

export default router;
