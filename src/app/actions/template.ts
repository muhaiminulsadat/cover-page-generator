"use server";

import {authActionClient} from "@/lib/safe-action";
import {
  createTemplateSchema,
  deleteTemplateSchema,
  editTemplateSchema,
} from "@/lib/validations/template";
import {
  deleteTemplate,
  insertTemplate,
  updateTemplate,
} from "@/lib/queries/template";
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
      revalidatePath("/dashboard");
      revalidatePath("/templates");
      
      const {updateTag, refresh} = await import("next/cache");
      if (template.departmentTarget && template.levelTarget) {
        updateTag(`templates-${template.departmentTarget}-${template.levelTarget}`);
      } else {
        updateTag("templates");
      }
      refresh();

      return {success: true, data: template};
    } catch (error) {
      console.error("Error creating template:", error);
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
      revalidatePath("/dashboard");
      revalidatePath(`/templates/${id}`);
      revalidatePath("/templates");

      const {updateTag, refresh} = await import("next/cache");
      if (updatedTemplate.departmentTarget && updatedTemplate.levelTarget) {
        updateTag(`templates-${updatedTemplate.departmentTarget}-${updatedTemplate.levelTarget}`);
      } else {
        updateTag("templates");
      }
      refresh();

      return {success: true, data: updatedTemplate};
    } catch (error) {
      console.error("Error editing template:", error);
      if (error instanceof Error) {
        throw error;
      }

      throw new Error("Failed to edit template");
    }
  });

export const deleteTemplateAction = authActionClient
  .schema(deleteTemplateSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const {id} = parsedInput;
      const deletedTemplate = await deleteTemplate(id, ctx.user.id);

      if (!deletedTemplate) {
        throw new Error("Not authorized or template not found");
      }

      revalidatePath("/");
      revalidatePath("/dashboard");
      revalidatePath("/templates");
      revalidatePath(`/templates/${id}`);

      const {updateTag, refresh} = await import("next/cache");
      if (deletedTemplate.departmentTarget && deletedTemplate.levelTarget) {
        updateTag(`templates-${deletedTemplate.departmentTarget}-${deletedTemplate.levelTarget}`);
      } else {
        updateTag("templates");
      }
      refresh();

      return {success: true};
    } catch (error) {
      console.error("Error deleting template:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete template");
    }
  });
