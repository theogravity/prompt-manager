import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@internal/utils";

export interface ApiKeyTable {
  id: Generated<string>;
  org_id: string;
  user_id: string;
  environment_id: string;
  secret: string;
  description: string | null;
  created_at: Generated<Date>;
  last_used_at: Date | null;
}

export type ApiKeyKind = Selectable<ApiKeyTable>;
export type NewApiKey = Insertable<ApiKeyTable>;
export type ApiKeyUpdate = Updateable<ApiKeyTable>;

export class ApiKey implements ApiKeyKind {
  public readonly id: string;
  public readonly org_id: string;
  public readonly user_id: string;
  public readonly environment_id: string;
  public readonly secret: string;
  public readonly description: string | null;
  public readonly created_at: Date;
  public readonly last_used_at: Date | null;

  constructor(data: NewApiKey) {
    this.id = data.id || generateId();
    this.org_id = data.org_id;
    this.user_id = data.user_id;
    this.environment_id = data.environment_id;
    this.secret = data.secret;
    this.description = data.description ?? null;
    this.created_at = data.created_at || new Date();
    this.last_used_at = data.last_used_at ?? null;
  }
}
