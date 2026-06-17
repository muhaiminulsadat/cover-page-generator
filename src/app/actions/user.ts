"use server";

import {db} from "@/db";
import {user} from "@/db/schema";
import {userProfileSchema, userSettingsSchema} from "@/lib/validations/user";
import {forgotPasswordSchema} from "@/lib/validations/auth";
import {eq} from "drizzle-orm";
import {actionClient, authActionClient} from "@/lib/safe-action";
import {revalidatePath} from "next/cache";
import {sendWelcomeEmail} from "@/lib/email";

export const updateProfile = authActionClient
  .schema(userProfileSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const existingUser = await db
        .select({
          studentId: user.studentId,
          university: user.university,
          department: user.department,
          section: user.section,
          subsection: user.subsection,
          level: user.level,
          term: user.term,
          hscBatch: user.hscBatch,
        })
        .from(user)
        .where(eq(user.id, ctx.user.id))
        .limit(1)
        .then((res) => res[0]);

      const isFirstTimeOnboarding =
        !existingUser?.studentId ||
        !existingUser?.university ||
        !existingUser?.department ||
        !existingUser?.section ||
        !existingUser?.subsection ||
        !existingUser?.level ||
        !existingUser?.term ||
        !existingUser?.hscBatch;

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

      revalidatePath("/");
      revalidatePath("/dashboard");

      if (isFirstTimeOnboarding) {
        try {
          await sendWelcomeEmail(ctx.user.email, ctx.user.name);
        } catch (error) {
          console.error("Failed to send welcome email during onboarding:", error);
        }
      }

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

export const checkEmailExists = actionClient
  .schema(forgotPasswordSchema)
  .action(async ({parsedInput}) => {
    try {
      const existing = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.email, parsedInput.email.toLowerCase()))
        .limit(1);

      return { exists: existing.length > 0 };
    } catch (error) {
      console.error("Error checking email existence:", error);
      return { exists: false };
    }
  });
