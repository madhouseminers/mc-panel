import * as express from "express";
import { verify } from "jsonwebtoken";
import type { SessionToken, SessionRequest } from "../types/sessions";
import { fetch_user_by_id } from "../data/user";

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
  let token: SessionToken;
  try {
    token = verify(
      req.cookies.session_token,
      process.env.JWT_KEY
    ) as SessionToken;
  } catch (_e) {
    return res.redirect("/");
  }

  // Append the user details to the request
  try {
    req.user = await fetch_user_by_id(req.app.get("db"), token.id);
  } catch (e) {
    console.log(e.message);
    return res.redirect("/");
  }

  next();
}
