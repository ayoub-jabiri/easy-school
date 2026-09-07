import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    deleteHomework,
    getHomeworks,
    getHomeworkClass,
    getHomeworkTeacher,
    getSingleHomework,
    registerHomework,
    updateHomework,
} from "./homework.controller.js";
import {
    homeworkDataValidation,
    homeworkExistsCheck,
    classCheck,
    teacherCheck,
    updateHomeworkDataValidation,
    homeworkAccessCheck,
} from "./homework.middleware.js";

const router = Router();

router.use(authenticationCheck);

router.get(
    "/",
    authorizationCheck(["admin", "teacher", "student"]),
    getHomeworks
);
router.post(
    "/",
    authorizationCheck(["teacher"]),
    requestBodyCheck,
    homeworkDataValidation,
    teacherCheck,
    classCheck,
    registerHomework
);

router.get(
    "/:homeworkId",
    authorizationCheck(["admin", "teacher", "student"]),
    paramsIdCheck("homeworkId"),
    homeworkExistsCheck,
    homeworkAccessCheck,
    getSingleHomework
);

router.put(
    "/:homeworkId",
    authorizationCheck(["teacher"]),
    paramsIdCheck("homeworkId"),
    homeworkExistsCheck,
    homeworkAccessCheck,
    requestBodyCheck,
    updateHomeworkDataValidation,
    updateHomework
);

router.delete(
    "/:homeworkId",
    authorizationCheck(["admin", "teacher"]),
    paramsIdCheck("homeworkId"),
    homeworkExistsCheck,
    homeworkAccessCheck,
    deleteHomework
);

router.get(
    "/:homeworkId/class",
    authorizationCheck(["admin", "teacher", "student"]),
    paramsIdCheck("homeworkId"),
    homeworkExistsCheck,
    homeworkAccessCheck,
    getHomeworkClass
);

router.get(
    "/:homeworkId/teacher",
    authorizationCheck(["admin", "teacher", "student"]),
    paramsIdCheck("homeworkId"),
    homeworkExistsCheck,
    homeworkAccessCheck,
    getHomeworkTeacher
);

export default router;
