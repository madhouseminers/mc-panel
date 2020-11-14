import { Pool } from "pg";

export async function up(db: Pool) {
  await db.query(`create table users (
        id       serial       not null,
        email    varchar(255) not null,
        password varchar(255) not null
    )`);
  await db.query(`create unique index users_email_uindex on users (email)`);
  await db.query(`create unique index users_id_uindex on users (id)`);
}

export async function down(db: Pool) {
  await db.query("drop table users");
}
