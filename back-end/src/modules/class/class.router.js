import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    assignTeacherToClass,
    deleteClass,
    getClasses,
    getSingleClass,
    registerClass,
    unassignTeacherToClass,
    updateClass,
} from "./class.controller.js";
import {
    assignTeacherDataValidation,
    classAlreadyExistsCheck,
    classDataValidation,
    classExistsCheck,
    schoolRoomExistsCheck,
    teacherAssignmentCheck,
} from "./class.middleware.js";

const router = Router();

router.use(authenticationCheck);

router.get("/", authorizationCheck(["admin"]), getClasses);
router.post(
    "/",
    authorizationCheck(["admin"]),
    requestBodyCheck,
    classDataValidation,
    classAlreadyExistsCheck,
    schoolRoomExistsCheck,
    registerClass
);

router.get(
    "/:classId",
    authorizationCheck(["admin"]),
    paramsIdCheck("classId"),
    classExistsCheck,
    getSingleClass
);
router.put(
    "/:classId",
    authorizationCheck(["admin"]),
    paramsIdCheck("classId"),
    requestBodyCheck,
    classDataValidation,
    classAlreadyExistsCheck,
    classExistsCheck,
    schoolRoomExistsCheck,
    updateClass
);
router.delete(
    "/:classId",
    authorizationCheck(["admin"]),
    paramsIdCheck("classId"),
    classExistsCheck,
    // classDeleteCheck,
    deleteClass
);
router.patch(
    "/:classId/assign-teacher",
    authorizationCheck(["admin"]),
    paramsIdCheck("classId"),
    classExistsCheck,
    teacherAssignmentCheck("hasTeacher"),
    requestBodyCheck,
    assignTeacherDataValidation,
    assignTeacherToClass
);
router.patch(
    "/:classId/unassign-teacher",
    authorizationCheck(["admin"]),
    paramsIdCheck("classId"),
    classExistsCheck,
    teacherAssignmentCheck("doesNotHaveTeacher"),
    unassignTeacherToClass
);

export default router;
