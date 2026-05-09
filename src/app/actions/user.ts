"use server";

import {db} from "@/db";
import {user} from "@/db/schema";
import {userProfileSchema, userSettingsSchema} from "@/lib/validations/user";
import {eq} from "drizzle-orm";
import {authActionClient} from "@/lib/safe-action";
import {revalidatePath} from "next/cache";

export const updateProfile = authActionClient
  .schema(userProfileSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      await db
        .update(user)
        .set({
          studentId: parsedInput.studentId,
          university: parsedInput.university,
          department: parsedInput.department,
          section: parsedInput.section,
          subsection: parsedInput.subsection,
          groupNo: parsedInput.groupNo,
          level: parsedInput.level,
          term: parsedInput.term,
          hscBatch: parsedInput.hscBatch,
        })
        .where(eq(user.id, ctx.user.id));

      return {success: true, data: parsedInput};
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile");
    }
  });

export const updateProfileSettings = authActionClient
  .schema(userSettingsSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      await db
        .update(user)
        .set({
          name: parsedInput.name,
          studentId: parsedInput.studentId,
          university: parsedInput.university,
          department: parsedInput.department,
          section: parsedInput.section,
          subsection: parsedInput.subsection,
          groupNo: parsedInput.groupNo,
          level: parsedInput.level,
          term: parsedInput.term,
          hscBatch: parsedInput.hscBatch,
        })
        .where(eq(user.id, ctx.user.id));

      revalidatePath("/");
      revalidatePath("/settings");

      return {success: true, data: parsedInput};
    } catch (error) {
      console.error("Error updating profile settings:", error);
      throw new Error("Failed to update profile settings");
    }
  });
