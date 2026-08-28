import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    getSchoolRooms,
    getSingleSchoolRoom,
    registerSchoolRoom,
} from "./room.controller.js";
import {
    schoolRoomDataValidation,
    schoolRoomExistsCheck,
    schoolRoomNumberExistsCheck,
} from "./room.middleware.js";

const router = Router();

router.use(authenticationCheck);

router.get("/", authorizationCheck(["admin"]), getSchoolRooms);
router.post(
    "/",
    authorizationCheck(["admin"]),
    requestBodyCheck,
    schoolRoomDataValidation,
    schoolRoomNumberExistsCheck,
    registerSchoolRoom
);

router.get(
    "/:schoolRoomId",
    authorizationCheck(["admin"]),
    paramsIdCheck("schoolRoomId"),
    schoolRoomExistsCheck,
    getSingleSchoolRoom
);

export default router;
