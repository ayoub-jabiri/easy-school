import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
} from "../../middlewares/global.middlewares.js";
import { getAdminDashboard } from "./dashboard.controller.js";
import { getAdminUsers } from "./dashboard.controller.js";

const router = Router();

router.use(authenticationCheck);

router.get("/admin/stats", authorizationCheck(["admin"]), getAdminDashboard);
router.get("/admin/users", authorizationCheck(["admin"]), getAdminUsers);

export default router;
