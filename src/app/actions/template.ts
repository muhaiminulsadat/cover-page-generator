"use server";

import {authActionClient} from "@/lib/safe-action";
import {
  createTemplateSchema,
  editTemplateSchema,
} from "@/lib/validations/template";
import {insertTemplate, updateTemplate} from "@/lib/queries/template";
import {revalidatePath} from "next/cache";

export const createTemplateAction = authActionClient
  .schema(createTemplateSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const {coverDesignId, ...rest} = parsedInput;

      const template = await insertTemplate({
        id: crypto.randomUUID(),
        ...rest,
        coverDesignId,
        createdBy: ctx.user.id,
      });

      revalidatePath("/");
      revalidatePath("/templates");

      return {success: true, data: template};
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Failed to create template");
    }
  });

export const editTemplateAction = authActionClient
  .schema(editTemplateSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const {id, coverDesignId, ...data} = parsedInput;
      const updatedTemplate = await updateTemplate(id, ctx.user.id, {
        ...data,
        coverDesignId,
      });
      if (!updatedTemplate) throw new Error("Not authorized or not found");

      revalidatePath("/");
      revalidatePath(`/templates/${id}`);
      revalidatePath("/templates");

      return {success: true, data: updatedTemplate};
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Failed to edit template");
    }
  });
