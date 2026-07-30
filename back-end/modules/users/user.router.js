import { Router } from "express";
import { register } from "./auth/auth.controller.js";
import { dataValidationCheck, userExistCheck } from "./auth/auth.middleware.js";

const router = Router();

// Auth Routes
router.post("/auth/register", dataValidationCheck, userExistCheck, register);

export default router;
