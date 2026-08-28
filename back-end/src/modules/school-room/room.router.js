import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
    paramsIdCheck,
} from "../../middlewares/global.middlewares.js";
import { getSchoolRooms, getSingleSchoolRoom } from "./room.controller.js";
import { schoolRoomExistsCheck } from "./room.middleware.js";

const router = Router();

router.use(authenticationCheck);

router.get("/", authorizationCheck(["admin"]), getSchoolRooms);
router.get(
    "/:schoolRoomId",
    authorizationCheck(["admin"]),
    paramsIdCheck("schoolRoomId"),
    schoolRoomExistsCheck,
    getSingleSchoolRoom
);

export default router;
