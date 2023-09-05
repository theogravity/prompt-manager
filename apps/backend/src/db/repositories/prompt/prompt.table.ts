import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@internal/utils";

export interface PromptTable {
  id: Generated<string>;
  org_id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Generated<Date>;
  environment_ids: string[];
}

export type PromptKind = Selectable<PromptTable>;
export type NewPrompt = Insertable<PromptTable>;
export type PromptUpdate = Updateable<PromptTable>;

export class Prompt implements PromptKind {
  public readonly id: string;
  public readonly org_id: string;
  public readonly user_id: string;
  public readonly name: string;
  public readonly description: string | null;
  public readonly created_at: Date;
  public readonly environment_ids: string[];

  constructor(data: NewPrompt) {
    this.id = data.id || generateId();
    this.org_id = data.org_id;
    this.user_id = data.user_id;
    this.name = data.name;
    this.description = data.description ?? null;
    this.environment_ids = data.environment_ids;
    this.created_at = data.created_at || new Date();
  }
}
