"use server";

import {authActionClient, moderatorActionClient} from "@/lib/safe-action";
import {
  createTemplateSchema,
  deleteTemplateSchema,
  editTemplateSchema,
} from "@/lib/validations/template";
import {logDownloadSchema} from "@/lib/validations/admin";
import {
  deleteTemplate,
  insertTemplate,
  updateTemplate,
  logDownload,
} from "@/lib/queries/template";
import {revalidatePath} from "next/cache";

export const createTemplateAction = moderatorActionClient
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
      const isSuperadmin = ctx.user.role === "superadmin";
      
      const updatedTemplate = await updateTemplate(
        id, 
        ctx.user.id, 
        {
          ...data,
          coverDesignId,
        },
        isSuperadmin
      );
      if (!updatedTemplate) throw new Error("Not authorized or not found");

      revalidatePath("/");
      revalidatePath("/dashboard");
      revalidatePath(`/templates/${id}`);
      revalidatePath("/templates");

      const {updateTag, refresh} = await import("next/cache");
      updateTag(`template-${id}`);
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
      const isSuperadmin = ctx.user.role === "superadmin";
      
      const deletedTemplate = await deleteTemplate(id, ctx.user.id, isSuperadmin);

      if (!deletedTemplate) {
        throw new Error("Not authorized or template not found");
      }

      revalidatePath("/");
      revalidatePath("/dashboard");
      revalidatePath("/templates");
      revalidatePath(`/templates/${id}`);

      const {updateTag, refresh} = await import("next/cache");
      updateTag(`template-${id}`);
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

export const logDownloadAction = authActionClient
  .schema(logDownloadSchema)
  .action(async ({parsedInput, ctx}) => {
    try {
      const {templateId} = parsedInput;

      // Extract headers from next/headers
      const {headers} = await import("next/headers");
      const headersList = await headers();
      const userAgent = headersList.get("user-agent") || "";
      
      // Simple parse for device type and browser
      let deviceType = "desktop";
      if (/Mobi|Android/i.test(userAgent)) deviceType = "mobile";
      else if (/Tablet|iPad/i.test(userAgent)) deviceType = "tablet";

      let browser = "Other";
      if (/Edg/i.test(userAgent)) browser = "Edge";
      else if (/Chrome/i.test(userAgent)) browser = "Chrome";
      else if (/Firefox/i.test(userAgent)) browser = "Firefox";
      else if (/Safari/i.test(userAgent)) browser = "Safari";

      await logDownload({
        id: crypto.randomUUID(),
        templateId,
        userId: ctx.user.id,
        deviceType,
        browser,
      });

      const {updateTag, refresh} = await import("next/cache");
      updateTag("downloads");
      updateTag("analytics");
      refresh();

      return {success: true};
    } catch (error) {
      console.error("Error logging download:", error);
      throw new Error("Failed to log download");
    }
  });

