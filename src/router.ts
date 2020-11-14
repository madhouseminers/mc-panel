import { Router } from "express";
import login from "./handlers/login";
import dashboard from "./handlers/dashboard";

const router = Router();
router.use("/", login);
router.use("/dashboard", dashboard);

export default router;
