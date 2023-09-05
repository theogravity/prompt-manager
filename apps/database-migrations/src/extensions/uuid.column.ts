import { ColumnBuilderCallback, CreateTableBuilder } from "kysely";

declare module "kysely" {
  interface CreateTableBuilder<TB extends string, C extends string = never> {
    addPrimaryIdColumn<CN extends string = "id">(
      col?: CN,
    ): CreateTableBuilder<TB, C | CN>;

    addIdColumn<CN extends string = "id">(
      col: CN,
      build?: ColumnBuilderCallback | undefined,
    ): CreateTableBuilder<TB, C | CN>;
  }
}

CreateTableBuilder.prototype.addPrimaryIdColumn = function (
  this: CreateTableBuilder<any, any>,
  col?: string,
) {
  return this.addColumn(col || "id", "text", (col) => col.primaryKey());
};

CreateTableBuilder.prototype.addIdColumn = function (
  this: CreateTableBuilder<any, any>,
  col: string,
  build?: ColumnBuilderCallback | undefined,
) {
  return this.addColumn(col, "text", build);
};
