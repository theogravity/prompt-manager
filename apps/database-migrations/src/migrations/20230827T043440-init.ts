import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("organization")
    .addPrimaryIdColumn()
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("user_id", "text", (col) => col.notNull())
    .addCreatedAtColumn()
    .execute();

  await db.schema
    .createTable("user")
    .addColumn("id", "text", (col) => col.unique().notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("given_name", "text", (col) => col.notNull())
    .addColumn("family_name", "text", (col) => col.notNull())
    .addUniqueConstraint("user_provider_uniq", ["id", "provider"])
    .addCreatedAtColumn()
    .execute();

  await db.schema
    .createTable("organization_user")
    .addIdColumn("org_id", (col) =>
      col.notNull().references("organization.id").onDelete("cascade"),
    )
    .addColumn("user_id", "text", (col) => col.notNull().references("user.id"))
    .addColumn("role", "text")
    .addColumn("environment_ids", sql`text[]`)
    .addColumn("disabled", "boolean", (col) => col.notNull().defaultTo(false))
    .addUniqueConstraint("org_user_uniq", ["org_id", "user_id"])
    .addCreatedAtColumn()
    .execute();

  await db.schema
    .createTable("environment")
    .addPrimaryIdColumn()
    .addIdColumn("org_id", (col) =>
      col.notNull().references("organization.id").onDelete("cascade"),
    )
    .addColumn("user_id", "text", (col) => col.notNull().references("user.id"))
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addCreatedAtColumn()
    .addUniqueConstraint("org_env_uniq", ["org_id", "name"])
    .execute();

  await db.schema
    .createTable("api_key")
    .addPrimaryIdColumn()
    .addIdColumn("org_id", (col) =>
      col.notNull().references("organization.id").onDelete("cascade"),
    )
    .addColumn("user_id", "text", (col) => col.notNull().references("user.id"))
    .addIdColumn("environment_id", (col) =>
      col.references("environment.id").onDelete("cascade"),
    )
    .addColumn("secret", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addColumn("last_used_at", "timestamptz")
    .addCreatedAtColumn()
    .execute();

  await db.schema
    .createTable("prompt")
    .addPrimaryIdColumn()
    .addIdColumn("org_id", (col) =>
      col.notNull().references("organization.id").onDelete("cascade"),
    )
    .addColumn("user_id", "text", (col) => col.notNull().references("user.id"))
    .addColumn("name", "text", (col) => col.notNull())
    .addColumn("description", "text")
    .addUniqueConstraint("prompt_uniq", ["org_id", "name"])
    .addCreatedAtColumn()
    .execute();

  await db.schema
    .createTable("prompt_definition")
    .addPrimaryIdColumn("id")
    .addIdColumn("org_id", (col) =>
      col.notNull().references("organization.id").onDelete("cascade"),
    )
    .addColumn("user_id", "text", (col) => col.notNull().references("user.id"))
    .addIdColumn("prompt_id", (col) =>
      col.notNull().references("prompt.id").onDelete("cascade"),
    )
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("version", "text", (col) => col.notNull())
    .addUniqueConstraint("prompt_def_uniq", ["prompt_id", "version"])
    .addCreatedAtColumn()
    .execute();

  await db.schema
    .createTable("prompt_environment")
    .addPrimaryIdColumn()
    .addIdColumn("org_id", (col) =>
      col.notNull().references("organization.id").onDelete("cascade"),
    )
    .addIdColumn("prompt_id")
    .addIdColumn("environment_id", (col) =>
      col.references("environment.id").onDelete("cascade"),
    )
    .addColumn("version", "text", (col) => col.notNull())
    .addForeignKeyConstraint(
      "prompt_def_ver_fk",
      ["prompt_id", "version"],
      "prompt_definition",
      ["prompt_id", "version"],
      (fk) => fk.onDelete("restrict"),
    )
    .addUniqueConstraint("prompt_env_uniq", [
      "prompt_id",
      "environment_id",
      "version",
    ])
    .addCreatedAtColumn()
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("organization").cascade().execute();
  await db.schema.dropTable("user").cascade().execute();
  await db.schema.dropTable("organization_user").cascade().execute();
  await db.schema.dropTable("environment").cascade().execute();
  await db.schema.dropTable("api_key").cascade().execute();
  await db.schema.dropTable("prompt").cascade().execute();
  await db.schema.dropTable("prompt_definition").cascade().execute();
  await db.schema.dropTable("prompt_environment").cascade().execute();
}
