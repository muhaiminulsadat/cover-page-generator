import {db} from "@/db";
import {templates, downloadLogs} from "@/db/schema";
import {and, eq, isNull, or} from "drizzle-orm";
import {DEFAULT_COVER_PAGE_DESIGN} from "@/lib/constants/cover-designs";

interface TemplateQueryRow {
  id: string;
  designId: string;
  coverDesignId: string;
  courseNumber: string;
  courseTitle: string;
  sessionTerm: string;
  departmentTarget: string | null;
  levelTarget: string | null;
  termTarget: string | null;
  hscBatchTarget: string | null;
  sectionTarget: string | null;
  subsectionTarget: string | null;
  createdBy: string;
  teacher1Name: string;
  teacher1Designation: string;
  teacher2Name: string | null;
  teacher2Designation: string | null;
  includeTopPage: boolean;
  includeCoverPage: boolean;
  includeIndexPage: boolean;
  experimentNames: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TemplateSelectRow {
  id: string;
  designId: string;
  coverDesignId?: string;
  courseNumber: string;
  courseTitle: string;
  sessionTerm: string;
  departmentTarget: string | null;
  levelTarget: string | null;
  termTarget: string | null;
  hscBatchTarget: string | null;
  sectionTarget: string | null;
  subsectionTarget: string | null;
  createdBy: string;
  teacher1Name: string;
  teacher1Designation: string;
  teacher2Name: string | null;
  teacher2Designation: string | null;
  includeTopPage: boolean;
  includeCoverPage: boolean;
  includeIndexPage: boolean;
  experimentNames?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const templateColumnsWithoutCover = {
  id: templates.id,
  designId: templates.designId,
  courseNumber: templates.courseNumber,
  courseTitle: templates.courseTitle,
  sessionTerm: templates.sessionTerm,
  departmentTarget: templates.departmentTarget,
  levelTarget: templates.levelTarget,
  termTarget: templates.termTarget,
  hscBatchTarget: templates.hscBatchTarget,
  sectionTarget: templates.sectionTarget,
  subsectionTarget: templates.subsectionTarget,
  createdBy: templates.createdBy,
  teacher1Name: templates.teacher1Name,
  teacher1Designation: templates.teacher1Designation,
  teacher2Name: templates.teacher2Name,
  teacher2Designation: templates.teacher2Designation,
  includeTopPage: templates.includeTopPage,
  includeCoverPage: templates.includeCoverPage,
  includeIndexPage: templates.includeIndexPage,
  experimentNames: templates.experimentNames,
  createdAt: templates.createdAt,
  updatedAt: templates.updatedAt,
} as const;

const templateColumnsWithCover = {
  ...templateColumnsWithoutCover,
  coverDesignId: templates.coverDesignId,
} as const;

function hydrateTemplateRow(row: TemplateSelectRow): TemplateQueryRow {
  return {
    ...row,
    coverDesignId: row.coverDesignId || DEFAULT_COVER_PAGE_DESIGN,
    experimentNames: row.experimentNames || [],
  };
}

function selectTemplateColumns() {
  return templateColumnsWithCover;
}

export async function insertTemplate(data: typeof templates.$inferInsert) {
  const baseData = data as typeof templates.$inferInsert;
  const payload: typeof templates.$inferInsert = {
    ...baseData,
    updatedAt: data.updatedAt ?? new Date(),
    coverDesignId: data.coverDesignId || DEFAULT_COVER_PAGE_DESIGN,
  };

  try {
    const results = await db.insert(templates).values(payload).returning();
    const newTemplate = results[0];
    if (!newTemplate) throw new Error("Failed to create template");
    return hydrateTemplateRow(newTemplate as TemplateSelectRow);
  } catch (error) {
    throw error;
  }
}

export async function getTemplateById(id: string) {
  "use cache: remote";
  const {cacheLife, cacheTag} = await import("next/cache");
  cacheLife("minutes");
  cacheTag(`template-${id}`);

  try {
    const columns = selectTemplateColumns();
    const rows = await db
      .select(columns)
      .from(templates)
      .where(eq(templates.id, id));
    const template = rows[0];
    return template ? hydrateTemplateRow(template as TemplateSelectRow) : null;
  } catch (error) {
    console.error("Error in getTemplateById:", error);
    throw error;
  }
}

export async function updateTemplate(
  id: string,
  userId: string,
  data: Partial<typeof templates.$inferInsert>,
  bypassOwnerCheck = false
) {
  const baseData = data as Partial<typeof templates.$inferInsert>;
  const payload: Partial<typeof templates.$inferInsert> = {
    ...baseData,
    updatedAt: new Date(),
  };

  if ("coverDesignId" in data) {
    payload.coverDesignId = data.coverDesignId || DEFAULT_COVER_PAGE_DESIGN;
  }

  try {
    const condition = bypassOwnerCheck
      ? eq(templates.id, id)
      : and(eq(templates.id, id), eq(templates.createdBy, userId));

    const results = await db
      .update(templates)
      .set(payload)
      .where(condition)
      .returning();
    const updatedTemplate = results[0];
    return updatedTemplate
      ? hydrateTemplateRow(updatedTemplate as TemplateSelectRow)
      : undefined;
  } catch (error) {
    throw error;
  }
}

export async function getTemplatesByMetadata(userMeta: {
  department?: string | null;
  level?: string | null;
  term?: string | null;
  section?: string | null;
  subsection?: string | null;
  hscBatch?: string | null;
}) {
  try {
    const columns = selectTemplateColumns();
    const rows = await db
      .select(columns)
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

    return rows.map((row) => hydrateTemplateRow(row as TemplateSelectRow));
  } catch (error) {
    console.error("Error in getTemplatesByMetadata:", error);
    throw error;
  }
}

export async function getAllTemplates() {
  try {
    const columns = selectTemplateColumns();
    const rows = await db.select(columns).from(templates);

    return rows.map((row) => hydrateTemplateRow(row as TemplateSelectRow));
  } catch (error) {
    console.error("Error in getAllTemplates:", error);
    throw error;
  }
}

export async function deleteTemplate(id: string, userId: string, bypassOwnerCheck = false) {
  try {
    const condition = bypassOwnerCheck
      ? eq(templates.id, id)
      : and(eq(templates.id, id), eq(templates.createdBy, userId));

    const results = await db
      .delete(templates)
      .where(condition)
      .returning();
    return results[0];
  } catch (error) {
    console.error("Error in deleteTemplate:", error);
    throw error;
  }
}

export async function logDownload(data: typeof downloadLogs.$inferInsert) {
  try {
    const results = await db.insert(downloadLogs).values(data).returning();
    return results[0];
  } catch (error) {
    console.error("Error in logDownload:", error);
    throw error;
  }
}
