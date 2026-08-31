import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    getClasses,
    getSingleClass,
    registerClass,
    updateClass,
} from "./class.controller.js";
import {
    classAlreadyExistsCheck,
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
export default router;
