import { Router } from "express";
import {
    getAdminUsers,
    getSingleUser,
    login,
    profile,
    register,
    updateUser,
} from "./user.controller.js";
import {
    loginDataValidationCheck,
    passwordMatchCheck,
    registerDataValidationCheck,
    userExistCheck,
    userExistsByIdCheck,
    userNotExistCheck,
    userUpdateDataValidationCheck,
    userUpdateExistCheck,
} from "./user.middleware.js";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
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

router.get(
    "/",
    authenticationCheck,
    authorizationCheck(["admin"]),
    getAdminUsers
);

router.get(
    "/:userId",
    authenticationCheck,
    authorizationCheck(["admin"]),
    paramsIdCheck("userId"),
    userExistsByIdCheck,
    getSingleUser
);

router.put(
    "/:userId",
    authenticationCheck,
    authorizationCheck(["admin"]),
    paramsIdCheck("userId"),
    userExistsByIdCheck,
    requestBodyCheck,
    userUpdateDataValidationCheck,
    userUpdateExistCheck,
    updateUser
);

export default router;
