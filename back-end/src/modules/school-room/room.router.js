import { Router } from "express";
import { authenticationCheck } from "../../middlewares/global.middlewares.js";

const router = Router();

router.use(authenticationCheck);

router.get("/", (req, res) => {
    res.json({ message: "School Room API is working!" });
});

export default router;
