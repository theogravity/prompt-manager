import { Kysely } from "kysely";
import { Database } from "..";
import { NewUser, UserKind } from "@/service/db/repositories/user/user.table";

export async function insertUser(
  db: Kysely<Database>,
  user: NewUser,
): Promise<UserKind> {
  const [u] = await db.insertInto("user").values(user).returningAll().execute();

  return u;
}
