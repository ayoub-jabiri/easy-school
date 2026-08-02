import { Router } from "express";
import { login, profile, register } from "./auth/auth.controller.js";
import {
    loginDataValidationCheck,
    passwordMatchCheck,
    registerDataValidationCheck,
    userExistCheck,
    userNotExistCheck,
} from "./auth/auth.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";

const router = Router();

// Auth Routes
router.post(
    "/auth/register",
    authenticationCheck,
    authorizationCheck(["admin"]),
    requestBodyCheck,
    registerDataValidationCheck,
    userExistCheck,
    register
);
router.post(
    "/auth/login",
    requestBodyCheck,
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
