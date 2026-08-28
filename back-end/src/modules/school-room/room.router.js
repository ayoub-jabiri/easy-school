import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
    requestBodyCheck,
} from "../../middlewares/global.middlewares.js";
import {
    deleteSchoolRoom,
    getSchoolRooms,
    getSingleSchoolRoom,
    registerSchoolRoom,
    updateSchoolRoom,
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
router.put(
    "/:schoolRoomId",
    authorizationCheck(["admin"]),
    paramsIdCheck("schoolRoomId"),
    requestBodyCheck,
    schoolRoomDataValidation,
    schoolRoomExistsCheck,
    updateSchoolRoom
);
router.delete(
    "/:schoolRoomId",
    authorizationCheck(["admin"]),
    paramsIdCheck("schoolRoomId"),
    schoolRoomExistsCheck,
    deleteSchoolRoom
);

export default router;
