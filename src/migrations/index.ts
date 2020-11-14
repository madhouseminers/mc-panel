import * as dotenv from "dotenv";
dotenv.config();

import { readdirSync } from "fs";
import db from "../db";

async function createMigrationTable() {
  await db.query(
    "create table if not exists migrations (migration varchar(255), version int)"
  );
}

async function getExistingMigrations() {
  return (await db.query("select * from migrations")).rows;
}

function getMigrations() {
  return readdirSync(__dirname).filter((file) => file !== "index.ts");
}

async function runMigration(migration: string, version: number) {
  const runnable = require(__dirname + "/" + migration);

  try {
    await db.query("BEGIN");
    await runnable.up(db);
    await db.query("insert into migrations values ($1, $2)", [
      migration,
      version,
    ]);
    await db.query("COMMIT");
  } catch (e) {
    await db.query("ROLLBACK");
  }
}

async function runMigrations() {
  await createMigrationTable();
  let existing = await getExistingMigrations();
  let all = getMigrations();
  let version =
    existing.reduce((v, migration) => Math.max(v, migration.version), 0) + 1;
  let existingMigrations = existing.map((migration) => migration.migration);

  let newMigrations = all.filter(
    (migration) => existingMigrations.indexOf(migration) === -1
  );

  for (let migration of newMigrations) {
    await runMigration(migration, version);
  }
}

runMigrations().then(() => process.exit(0));
