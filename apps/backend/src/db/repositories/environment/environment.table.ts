import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@/lib/id";

export interface EnvironmentTable {
  id: Generated<string>;
  org_id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Generated<Date>;
}

export type EnvironmentKind = Selectable<EnvironmentTable>;
export type NewEnvironment = Insertable<EnvironmentTable>;
export type EnvironmentUpdate = Updateable<EnvironmentTable>;

export class Environment implements EnvironmentKind {
  public readonly id: string;
  public readonly org_id: string;
  public readonly user_id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly created_at: Date;

  constructor(data: NewEnvironment) {
    this.id = data.id || generateId();
    this.org_id = data.org_id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.description = data.description ?? null;
    this.created_at = data.created_at || new Date();
  }
}
