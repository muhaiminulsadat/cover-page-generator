"use server";

import {authActionClient} from "@/lib/safe-action";
import {
  createTemplateSchema,
  editTemplateSchema,
} from "@/lib/validations/template";
import {insertTemplate, updateTemplate} from "@/app/queries/template";
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

export const editTemplateAction = authActionClient
  .schema(editTemplateSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const {id, ...data} = parsedInput;
      const template = await updateTemplate(id, ctx.user.id, data);
      if (!template) throw new Error("Not authorized or not found");

      revalidatePath("/");
      revalidatePath(`/templates/${id}`);
      revalidatePath("/templates");

      return {success: true, data: template};
    } catch (error) {
      throw new Error("Failed to edit template");
    }
  });
