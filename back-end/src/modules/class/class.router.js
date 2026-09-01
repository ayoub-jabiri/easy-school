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
    updateClass,
} from "./class.controller.js";
import {
    assignTeacherDataValidation,
    classAlreadyExistsCheck,
    classAlreadyHasTeacherCheck,
    classDataValidation,
    classExistsCheck,
    schoolRoomExistsCheck,
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
router.post(
    "/:classId/assign-teacher",
    authorizationCheck(["admin"]),
    paramsIdCheck("classId"),
    classExistsCheck,
    requestBodyCheck,
    classAlreadyHasTeacherCheck,
    assignTeacherDataValidation,
    assignTeacherToClass
);
export default router;
