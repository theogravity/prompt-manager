import { OrganizationTable } from "./organization/organization.table.js";
import { UserTable } from "./user/user.table.js";
import { OrganizationUserTable } from "./organization/organization-user.table.js";
import { ApiKeyTable } from "./api-key/api-key.table.js";
import { EnvironmentTable } from "./environment/environment.table.js";
import { PromptTable } from "./prompt/prompt.table.js";
import { PromptDefinitionTable } from "./prompt/prompt-definition.table.js";

export interface Database {
  organization: OrganizationTable;
  user: UserTable;
  user_organization: OrganizationUserTable;
  api_key: ApiKeyTable;
  environment: EnvironmentTable;
  prompt: PromptTable;
  prompt_definition: PromptDefinitionTable;
}

let database: Database;

export function initDatabase() {
  return database;
}
