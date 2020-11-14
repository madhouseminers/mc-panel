import type { Pool } from "pg";
import type { User } from "../types/user";

export async function fetch_user_by_id(db: Pool, id: number): Promise<User> {
  const user_matches = (
    await db.query<User>("select * from users where id = $1", [id])
  ).rows;
  return user_matches[0];
}

export async function fetch_user_by_email(
  db: Pool,
  email: string
): Promise<User> {
  const user_matches = (
    await db.query<User>("select * from users where email = $1", [email])
  ).rows;
  return user_matches[0];
}
