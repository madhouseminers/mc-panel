import { Pool } from "pg";
import { hash } from "argon2";

export async function up(db: Pool) {
  await db.query("insert into users (email, password) values ($1, $2)", [
    "asdf@asdf.com",
    await hash("asdf"),
  ]);
}

export async function down(db: Pool) {
  await db.query("delete from users where email=$1", ["asdf@asdf.com"]);
}
