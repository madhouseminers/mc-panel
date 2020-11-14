import type { Request } from "express";
import type { User } from "./user";

export interface SessionToken {
  id: number;
}

export interface SessionRequest extends Request {
  user: User;
}
