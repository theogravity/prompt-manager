import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@internal/utils";

export interface PromptDefinitionTable {
  id: Generated<string>;
  org_id: string;
  user_id: string;
  prompt_id: string;
  content: string;
  version: string;
  published: boolean;
  created_at: Generated<Date>;
}

export type PromptDefinitionKind = Selectable<PromptDefinitionTable>;
export type NewPromptDefinition = Insertable<PromptDefinitionTable>;
export type PromptDefinitionUpdate = Updateable<PromptDefinitionTable>;

export class PromptDefinition implements PromptDefinitionKind {
  id: string;
  org_id: string;
  user_id: string;
  prompt_id: string;
  content: string;
  version: string;
  published: boolean;
  created_at: Date;

  constructor(data: NewPromptDefinition) {
    this.id = data.id || generateId();
    this.org_id = data.org_id;
    this.user_id = data.user_id;
    this.prompt_id = data.prompt_id;
    this.content = data.content;
    this.version = data.version;
    this.published = data.published;
    this.created_at = data.created_at || new Date();
  }
}
