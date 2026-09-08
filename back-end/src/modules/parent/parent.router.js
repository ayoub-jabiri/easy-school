import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
} from "../../middlewares/global.middlewares.js";
import {
    getParentStudents,
    getStudent,
    getStudentClasses,
    getStudentGrades,
    getStudentHomeworks,
} from "./parent.controller.js";
import { studentAccessCheck, studentExistsCheck } from "./parent.middleware.js";

const router = Router();

router.use(authenticationCheck);
router.use(authorizationCheck(["parent"]));

router.get("/students", getParentStudents);

router.get(
    "/students/:studentId",
    paramsIdCheck("studentId"),
    studentExistsCheck,
    studentAccessCheck,
    getStudent
);

router.get(
    "/students/:studentId/classes",
    paramsIdCheck("studentId"),
    studentExistsCheck,
    studentAccessCheck,
    getStudentClasses
);

router.get(
    "/students/:studentId/grades",
    paramsIdCheck("studentId"),
    studentExistsCheck,
    studentAccessCheck,
    getStudentGrades
);

router.get(
    "/students/:studentId/homeworks",
    paramsIdCheck("studentId"),
    studentExistsCheck,
    studentAccessCheck,
    getStudentHomeworks
);

export default router;
