import { verify } from "jsonwebtoken";
import type { Pool } from "pg";
import { fetch_user_by_id } from "../data/user";
import type { SessionToken } from "../types/sessions";
import type { User } from "../types/user";

export async function get_user_from_session_token(
  db: Pool,
  token: string
): Promise<User> {
  let decoded_token = verify(token, process.env.JWT_KEY) as SessionToken;
  return await fetch_user_by_id(db, decoded_token.id);
}
