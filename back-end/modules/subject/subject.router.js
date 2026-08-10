import { Router } from "express";
import { getSubjects, registerSubject } from "./subject.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
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

export default router;
