import {db} from "@/db";
import {templates} from "@/db/schema";
import {eq, and, or, isNull} from "drizzle-orm";

export async function insertTemplate(data: typeof templates.$inferInsert) {
  const [newTemplate] = await db.insert(templates).values(data).returning();
  return newTemplate;
}

export async function getTemplateById(id: string) {
  const [template] = await db
    .select()
    .from(templates)
    .where(eq(templates.id, id));
  return template;
}

export async function getTemplatesByMetadata(userMeta: {
  department?: string | null;
  level?: string | null;
  section?: string | null;
  term?: string | null;
}) {
  // A simple matching query. In a real app, this might be more complex
  // (e.g., ignoring null target columns so a template without a target is visible to all).
  return await db
    .select()
    .from(templates)
    .where(
      and(
        userMeta.department
          ? or(
              eq(templates.departmentTarget, userMeta.department),
              eq(templates.departmentTarget, ""),
              isNull(templates.departmentTarget),
            )
          : undefined,
        userMeta.level
          ? or(
              eq(templates.levelTarget, userMeta.level),
              eq(templates.levelTarget, ""),
              isNull(templates.levelTarget),
            )
          : undefined,
        userMeta.term
          ? or(
              eq(templates.termTarget, userMeta.term),
              eq(templates.termTarget, ""),
              isNull(templates.termTarget),
            )
          : undefined,
      ),
    );
}

export async function getAllTemplates() {
  return await db.select().from(templates);
}
