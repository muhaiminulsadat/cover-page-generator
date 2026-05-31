import {z} from "zod";

export const updateUserRoleSchema = z.object({
  targetUserId: z.string().min(1),
  newRole: z.enum(["student", "moderator", "admin", "superadmin"]),
});

export const logDownloadSchema = z.object({
  templateId: z.string().min(1),
});
