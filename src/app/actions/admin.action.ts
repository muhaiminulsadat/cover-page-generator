"use server";

import {adminActionClient} from "@/lib/safe-action";
import {updateUserRoleSchema} from "@/lib/validations/admin";
import {auth} from "@/lib/auth";

export const updateUserRoleAction = adminActionClient
  .schema(updateUserRoleSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      if (ctx.user.id === parsedInput.targetUserId) {
        throw new Error("You cannot change your own role.");
      }

      if (ctx.user.role === "admin" && parsedInput.newRole === "superadmin") {
        throw new Error("Admins cannot grant superadmin role.");
      }

      const {db} = await import("@/db");
      const {user} = await import("@/db/schema");
      const {eq} = await import("drizzle-orm");
      
      await db
        .update(user)
        .set({role: parsedInput.newRole})
        .where(eq(user.id, parsedInput.targetUserId));

      const {updateTag, refresh} = await import("next/cache");
      updateTag("users");
      refresh();

      return {success: true};
    } catch (error) {
      console.error("Error updating user role:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update user role");
    }
  });
