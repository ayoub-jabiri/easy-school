import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    deleteGrade,
    getGrades,
    getGradeStudent,
    getGradeTeacher,
    getSingleGrade,
    registerGrade,
    updateGrade,
} from "./grade.controller.js";
import {
    gradeDataValidation,
    gradeExistsCheck,
    studentCheck,
    classCheck,
    teacherCheck,
    updateGradeDataValidation,
    gradeAccessCheck,
} from "./grade.middleware.js";

const router = Router();

router.use(authenticationCheck);

router.get("/", authorizationCheck(["admin", "teacher", "student"]), getGrades);
router.post(
    "/",
    authorizationCheck(["teacher"]),
    requestBodyCheck,
    gradeDataValidation,
    teacherCheck,
    classCheck,
    studentCheck,
    registerGrade
);

router.get(
    "/:gradeId",
    authorizationCheck(["admin", "teacher", "student"]),
    paramsIdCheck("gradeId"),
    gradeExistsCheck,
    gradeAccessCheck,
    getSingleGrade
);

router.put(
    "/:gradeId",
    authorizationCheck(["teacher"]),
    paramsIdCheck("gradeId"),
    gradeExistsCheck,
    gradeAccessCheck,
    requestBodyCheck,
    updateGradeDataValidation,
    updateGrade
);

router.delete(
    "/:gradeId",
    authorizationCheck(["admin", "teacher"]),
    paramsIdCheck("gradeId"),
    gradeExistsCheck,
    gradeAccessCheck,
    deleteGrade
);

router.get(
    "/:gradeId/student",
    authorizationCheck(["admin", "teacher"]),
    paramsIdCheck("gradeId"),
    gradeExistsCheck,
    gradeAccessCheck,
    getGradeStudent
);

router.get(
    "/:gradeId/teacher",
    authorizationCheck(["admin", "teacher"]),
    paramsIdCheck("gradeId"),
    gradeExistsCheck,
    gradeAccessCheck,
    getGradeTeacher
);

export default router;
