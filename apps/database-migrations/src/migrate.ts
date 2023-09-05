import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";
import "dotenv/config";
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely";
import { run } from "kysely-migration-cli";
import "./extensions";

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string, 10),
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
    }),
  }),
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, "migrations"),
  }),
});

run(db, migrator);
