import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  template: ["create", "edit", "delete"],
  user: ["manage_roles"],
  analytics: ["view"],
} as const;

export const ac = createAccessControl(statement);

export const studentAc = ac.newRole({
  template: [],
});

export const moderatorAc = ac.newRole({
  template: ["create", "edit", "delete"],
});

export const adminAc = ac.newRole({
  template: ["create", "edit", "delete"],
  user: ["manage_roles"],
});

export const superadminAc = ac.newRole({
  template: ["create", "edit", "delete"],
  user: ["manage_roles"],
  analytics: ["view"],
});
