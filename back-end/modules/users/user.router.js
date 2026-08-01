import { Router } from "express";
import { login, profile, register } from "./auth/auth.controller.js";
import {
    loginDataValidationCheck,
    passwordMatchCheck,
    registerDataValidationCheck,
    userExistCheck,
    userNotExistCheck,
    authenticationCheck,
    authorizationCheck,
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

router.get(
    "/auth/profile",
    authenticationCheck,
    authorizationCheck(["admin", "teacher", "student", "parent"]),
    profile
);

export default router;
