import { Generated, Insertable, Selectable, Updateable } from "kysely";
import { generateId } from "@internal/utils";

export interface OrganizationTable {
  id: Generated<string>;
  user_id: string;
  name: string;
  created_at: Generated<Date>;
}

export type OrganizationKind = Selectable<OrganizationTable>;
export type NewOrganization = Insertable<OrganizationTable>;
export type OrganizationUpdate = Updateable<OrganizationTable>;

export class Organization implements OrganizationKind {
  public readonly id: string;
  public readonly user_id: string;
  public readonly name: string;
  public readonly created_at: Date;

  constructor(data: NewOrganization) {
    this.id = data.id || generateId();
    this.user_id = data.user_id;
    this.name = data.name;
    this.created_at = data.created_at || new Date();
  }
}
