import { Router } from "express";
import {
    authenticationCheck,
    authorizationCheck,
} from "../../middlewares/global.middlewares.js";
import { getClasses } from "./class.controller.js";

const router = Router();

router.use(authenticationCheck);

router.get("/", authorizationCheck(["admin"]), getClasses);
// router.post(
//     "/",
//     authorizationCheck(["admin"]),
//     requestBodyCheck,
//     schoolRoomDataValidation,
//     schoolRoomNumberExistsCheck,
//     registerSchoolRoom
// );

export default router;
