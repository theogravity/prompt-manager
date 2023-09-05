import { Insertable, Selectable, Updateable, Generated } from "kysely";

export enum OrganizationRole {
  Owner = "Owner",
  Admin = "Admin",
  Member = "Member",
}

export interface OrganizationUserTable {
  org_id: string;
  user_id: string;
  role: OrganizationRole;
  environment_ids: string[];
  disabled: boolean;
  created_at: Generated<Date>;
}

export type OrganizationUser = Selectable<OrganizationUserTable>;
export type NewOrganizationUser = Insertable<OrganizationUserTable>;
export type OrganizationUserUpdate = Updateable<OrganizationUserTable>;

export class OrganizationUserModel implements OrganizationUser {
  public readonly org_id: string;
  public readonly user_id: string;
  public readonly role: OrganizationRole;
  public readonly environment_ids: string[];
  public readonly disabled: boolean;
  public readonly created_at: Date;

  constructor(data: OrganizationUser) {
    this.org_id = data.org_id;
    this.user_id = data.user_id;
    this.role = data.role;
    this.environment_ids = data.environment_ids;
    this.disabled = data.disabled;
    this.created_at = data.created_at || new Date();
  }
}
