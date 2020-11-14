import * as express from "express";
import type { SessionRequest } from "../types/sessions";
import { get_user_from_session_token } from "../util/session";

export default async function requireAuth(
  req: SessionRequest,
  res: express.Response,
  next: express.NextFunction
) {
  // Check if the session cookie exists
  if (!req.cookies.session_token) {
    return res.redirect("/");
  }

  // Check if the session cookie is a valid JWT
  try {
    req.user = await get_user_from_session_token(
      req.app.get("db"),
      req.cookies.session_token
    );
  } catch (e) {
    console.log(e.message);
    res.clearCookie("session_token");
    return res.redirect("/");
  }

  next();
}
