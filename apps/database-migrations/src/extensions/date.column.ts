import { CreateTableBuilder, sql } from "kysely";

declare module "kysely" {
  interface CreateTableBuilder<TB extends string, C extends string = never> {
    addCreatedAtColumn(): CreateTableBuilder<TB, C>;

    addUpdatedAtColumn(): CreateTableBuilder<TB, C>;
  }
}

CreateTableBuilder.prototype.addCreatedAtColumn = function (
  this: CreateTableBuilder<any, any>,
) {
  return this.addColumn("created_at", "timestamptz", (col) =>
    col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
  );
};

CreateTableBuilder.prototype.addUpdatedAtColumn = function (
  this: CreateTableBuilder<any, any>,
) {
  return this.addColumn("updated_at", "timestamptz", (col) =>
    col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
  );
};
