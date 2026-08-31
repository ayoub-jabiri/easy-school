import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import { getClasses, registerClass } from "./class.controller.js";
import {
    classDataValidation,
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
    schoolRoomExistsCheck,
    registerClass
);

export default router;
