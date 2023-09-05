import { Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@internal/utils";

export interface PromptEnvironmentTable {
  id: string;
  org_id: string;
  prompt_id: string;
  environment_id: string;
  version: string;
}

export type PromptAssignmentKind = Selectable<PromptEnvironmentTable>;
export type NewPromptAssignment = Insertable<PromptEnvironmentTable>;
export type PromptAssignmentUpdate = Updateable<PromptEnvironmentTable>;

export class PromptAssignment implements PromptAssignmentKind {
  id: string;
  org_id: string;
  prompt_id: string;
  environment_id: string;
  version: string;

  constructor(data: NewPromptAssignment) {
    this.id = data.id || generateId();
    this.org_id = data.org_id;
    this.prompt_id = data.prompt_id;
    this.environment_id = data.environment_id;
    this.version = data.version;
  }
}
