import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@/lib/id";

export interface UserTable {
  id: Generated<string>;
  provider: string;
  email: string;
  given_name: string;
  family_name: string;
  created_at: Generated<Date>;
}

export type UserKind = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export class User implements UserKind {
  id: string;
  provider: string;
  email: string;
  given_name: string;
  family_name: string;
  created_at: Date;

  constructor(user: NewUser) {
    this.id = user.id || generateId();
    this.provider = user.provider;
    this.email = user.email;
    this.given_name = user.given_name;
    this.family_name = user.family_name;
    this.created_at = user.created_at || new Date();
  }
}
