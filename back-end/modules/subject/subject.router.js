import { Router } from "express";
import {
    getSingleSubject,
    getSubjects,
    registerSubject,
} from "./subject.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    subjectDataValidation,
    subjectExistCheck,
} from "./subject.middleware.js";

const router = Router();

router.get(
    "/",
    authenticationCheck,
    authorizationCheck(["admin"]),
    getSubjects
);
router.post(
    "/",
    authenticationCheck,
    authorizationCheck(["admin"]),
    requestBodyCheck,
    subjectDataValidation,
    subjectExistCheck,
    registerSubject
);

router.get(
    "/:subjectId",
    authenticationCheck,
    authorizationCheck(["admin"]),
    paramsIdCheck,
    getSingleSubject
);

export default router;
