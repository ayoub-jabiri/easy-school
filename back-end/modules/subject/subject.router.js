import { Router } from "express";
import { getSubjects } from "./subject.controller.js";
import {
    authenticationCheck,
    authorizationCheck,
} from "../../middlewares/global.middlewares.js";

const router = Router();

router.get(
    "/",
    authenticationCheck,
    authorizationCheck(["admin"]),
    getSubjects
);

export default router;
