"use server";

import {db} from "@/db";
import {user} from "@/db/schema";
import {userProfileSchema} from "@/lib/validations/user";
import {eq} from "drizzle-orm";
import {authActionClient} from "@/lib/safe-action";

export const updateProfile = authActionClient
  .schema(userProfileSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      await db
        .update(user)
        .set({
          studentId: parsedInput.studentId,
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
      throw new Error("Failed to update profile");
    }
  });
