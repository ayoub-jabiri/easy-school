import { Router } from "express";
import { register } from "./auth/auth.controller.js";

const router = Router();

// Auth Routes
router.get("/auth", register);

export default router;
