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

export async function updateTemplate(
  id: string,
  userId: string,
  data: Partial<typeof templates.$inferInsert>,
) {
  const [updatedTemplate] = await db
    .update(templates)
    .set({...data, updatedAt: new Date()})
    .where(and(eq(templates.id, id), eq(templates.createdBy, userId)))
    .returning();
  return updatedTemplate;
}

export async function getTemplatesByMetadata(userMeta: {
  department?: string | null;
  level?: string | null;
  term?: string | null;
  section?: string | null;
  subsection?: string | null;
  hscBatch?: string | null;
}) {
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
        userMeta.section
          ? or(
              eq(templates.sectionTarget, userMeta.section),
              eq(templates.sectionTarget, ""),
              isNull(templates.sectionTarget),
            )
          : undefined,
        userMeta.subsection
          ? or(
              eq(templates.subsectionTarget, userMeta.subsection),
              eq(templates.subsectionTarget, ""),
              isNull(templates.subsectionTarget),
            )
          : undefined,
        userMeta.hscBatch
          ? or(
              eq(templates.hscBatchTarget, userMeta.hscBatch),
              eq(templates.hscBatchTarget, ""),
              isNull(templates.hscBatchTarget),
            )
          : undefined,
      ),
    );
}

export async function getAllTemplates() {
  return await db.select().from(templates);
}
