"use server";

import {authActionClient} from "@/lib/safe-action";
import {createTemplateSchema} from "@/lib/validations/template";
import {insertTemplate} from "@/app/queries/template";
import {revalidatePath} from "next/cache";

export const createTemplateAction = authActionClient
  .schema(createTemplateSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const template = await insertTemplate({
        id: crypto.randomUUID(),
        ...parsedInput,
        createdBy: ctx.user.id,
      });

      revalidatePath("/");
      revalidatePath("/templates");

      return {success: true, data: template};
    } catch (error) {
      throw new Error("Failed to create template");
    }
  });
