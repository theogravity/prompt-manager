import { Kysely } from "kysely";
import { Database } from "../index.js";
import { NewOrganization, OrganizationKind } from "./organization.table.js";

export async function insertOrganization(
  db: Kysely<Database>,
  org: NewOrganization,
): Promise<OrganizationKind> {
  const [organization] = await db
    .insertInto("organization")
    .values(org)
    .returningAll()
    .execute();

  return organization;
}
