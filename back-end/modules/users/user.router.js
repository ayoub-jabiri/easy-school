import { Router } from "express";
import { register } from "./auth/auth.controller.js";
import {
    dataValidationChaeck,
    userExistCheck,
} from "./auth/auth.middleware.js";

const router = Router();

// Auth Routes
router.post("/auth/register", dataValidationChaeck, userExistCheck, register);

export default router;
