import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { fetch_user_by_email } from "../data/user";
import * as argon2 from "argon2";
import { User } from "../types/user";

let router = Router();

router.get("/", (_req, res) => {
  res.render("login", { errors: {}, email: "" });
});

router.post("/", async (req, res) => {
  let errors: { email?: string; password?: string } = {};
  if (!req.body.email) {
    errors.email = "E-mail is a required field";
  }
  if (!req.body.password) {
    errors.password = "Password is a required field";
  }

  if (Object.keys(errors).length) {
    return res.render("login", { errors, email: req.body.email });
  }

  let user: User;
  try {
    user = await fetch_user_by_email(req.app.get("db"), req.body.email);

    if (!user || !(await argon2.verify(user.password, req.body.password))) {
      errors.password = "Invalid e-mail or password supplied";
      return res.render("login", { errors, email: req.body.email });
    }
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(500);
  }

  const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_KEY);
  res.cookie("session_token", jwtToken);
  res.redirect("/dashboard");
});

export default router;
