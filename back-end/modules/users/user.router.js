import { Router } from "express";
import { login, register } from "./auth/auth.controller.js";
import {
    loginDataValidationCheck,
    passwordMatchCheck,
    registerDataValidationCheck,
    userExistCheck,
    userNotExistCheck,
} from "./auth/auth.middleware.js";

const router = Router();

// Auth Routes
router.post(
    "/auth/register",
    registerDataValidationCheck,
    userExistCheck,
    register
);
router.post(
    "/auth/login",
    loginDataValidationCheck,
    userNotExistCheck,
    passwordMatchCheck,
    login
);

export default router;
