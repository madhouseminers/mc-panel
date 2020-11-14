import { Router } from "express";
import requireAuth from "../middleware/require_auth";
import type { SessionRequest } from "../types/sessions";

const router = Router();

router.get("/", requireAuth, (_req: SessionRequest, res) => {
  res.send("DASHBOARD");
});

export default router;
