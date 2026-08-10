import { Router } from "express";
import {
    getSingleSubject,
    getSubjects,
    registerSubject,
    updateSubject,
} from "./subject.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    subjectDataValidation,
    subjectAlreadyExistCheck,
    subjectExistsCheck,
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
    subjectAlreadyExistCheck,
    registerSubject
);

router.get(
    "/:subjectId",
    authenticationCheck,
    authorizationCheck(["admin"]),
    paramsIdCheck,
    subjectExistsCheck,
    getSingleSubject
);

router.put(
    "/:subjectId",
    authenticationCheck,
    authorizationCheck(["admin"]),
    paramsIdCheck,
    subjectExistsCheck,
    requestBodyCheck,
    subjectDataValidation,
    updateSubject
);

export default router;
