import {db} from "@/db";
import {templates} from "@/db/schema";
import {and, eq, isNull, or, sql} from "drizzle-orm";
import {DEFAULT_COVER_PAGE_DESIGN} from "@/lib/constants/cover-designs";
import {IndexRow} from "@/components/pdf/core/types";

interface TemplateQueryRow {
  id: string;
  designId: string;
  coverDesignId: string;
  courseNumber: string;
  courseTitle: string;
  sessionTerm: string;
  experimentName: string | null;
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
  indexRows: IndexRow[];
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
  experimentName?: string | null;
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
  indexRows?: IndexRow[];
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
  createdAt: templates.createdAt,
  updatedAt: templates.updatedAt,
} as const;

const templateColumnsWithCover = {
  ...templateColumnsWithoutCover,
  coverDesignId: templates.coverDesignId,
} as const;

const templateColumnsWithExperimentName = {
  ...templateColumnsWithoutCover,
  experimentName: templates.experimentName,
} as const;

const templateColumnsWithCoverAndIndexRows = {
  ...templateColumnsWithCover,
  indexRows: templates.indexRows,
} as const;

let hasCoverDesignColumnPromise: Promise<boolean> | null = null;
let hasExperimentNameColumnPromise: Promise<boolean> | null = null;
let hasIndexRowsColumnPromise: Promise<boolean> | null = null;

async function hasCoverDesignColumn(): Promise<boolean> {
  if (!hasCoverDesignColumnPromise) {
    hasCoverDesignColumnPromise = db
      .execute(
        sql`
        select 1
        from information_schema.columns
        where table_name = 'templates'
          and column_name = 'cover_design_id'
        limit 1
      `,
      )
      .then((result) => result.rows.length > 0)
      .catch(() => false);
  }

  return hasCoverDesignColumnPromise;
}

async function hasExperimentNameColumn(): Promise<boolean> {
  if (!hasExperimentNameColumnPromise) {
    hasExperimentNameColumnPromise = db
      .execute(
        sql`
        select 1
        from information_schema.columns
        where table_name = 'templates'
          and column_name = 'experiment_name'
        limit 1
      `,
      )
      .then((result) => result.rows.length > 0)
      .catch(() => false);
  }

  return hasExperimentNameColumnPromise;
}

async function hasIndexRowsColumn(): Promise<boolean> {
  if (!hasIndexRowsColumnPromise) {
    hasIndexRowsColumnPromise = db
      .execute(
        sql`
        select 1
        from information_schema.columns
        where table_name = 'templates'
          and column_name = 'index_rows'
        limit 1
      `,
      )
      .then((result) => result.rows.length > 0)
      .catch(() => false);
  }

  return hasIndexRowsColumnPromise;
}

function hydrateTemplateRow(row: TemplateSelectRow): TemplateQueryRow {
  return {
    ...row,
    coverDesignId: row.coverDesignId || DEFAULT_COVER_PAGE_DESIGN,
    experimentName: row.experimentName?.trim() || null,
    indexRows: Array.isArray(row.indexRows)
      ? (row.indexRows as IndexRow[])
      : [],
  };
}

async function selectTemplateColumns() {
  const [supportsCoverDesign, supportsExperimentName, supportsIndexRows] =
    await Promise.all([
      hasCoverDesignColumn(),
      hasExperimentNameColumn(),
      hasIndexRowsColumn(),
    ]);

  if (supportsCoverDesign && supportsExperimentName && supportsIndexRows) {
    return {
      ...templateColumnsWithCoverAndIndexRows,
      experimentName: templates.experimentName,
    } as const;
  }

  if (supportsCoverDesign && supportsIndexRows) {
    return {
      ...templateColumnsWithCoverAndIndexRows,
      ...(supportsExperimentName
        ? {experimentName: templates.experimentName}
        : {}),
    } as const;
  }

  if (supportsCoverDesign) {
    return supportsExperimentName
      ? ({
          ...templateColumnsWithCover,
          experimentName: templates.experimentName,
        } as const)
      : templateColumnsWithCover;
  }

  if (supportsIndexRows) {
    return {
      ...(supportsExperimentName
        ? templateColumnsWithExperimentName
        : templateColumnsWithoutCover),
      indexRows: templates.indexRows,
    } as const;
  }

  return supportsExperimentName
    ? templateColumnsWithExperimentName
    : templateColumnsWithoutCover;
}

export async function insertTemplate(data: typeof templates.$inferInsert) {
  const [supportsCoverDesign, supportsExperimentName, supportsIndexRows] =
    await Promise.all([
      hasCoverDesignColumn(),
      hasExperimentNameColumn(),
      hasIndexRowsColumn(),
    ]);
  const {experimentName, indexRows, ...baseData} =
    data as typeof templates.$inferInsert & {
      experimentName?: string;
      indexRows?: IndexRow[];
    };
  const payload: typeof templates.$inferInsert = {
    ...baseData,
    updatedAt: data.updatedAt ?? new Date(),
    ...(supportsExperimentName
      ? {experimentName: experimentName?.trim() || ""}
      : {}),
    ...(supportsCoverDesign
      ? {coverDesignId: data.coverDesignId || DEFAULT_COVER_PAGE_DESIGN}
      : {}),
    ...(supportsIndexRows ? {indexRows} : {}),
  };

  try {
    const [newTemplate] = await db
      .insert(templates)
      .values(payload)
      .returning();
    return hydrateTemplateRow(newTemplate as TemplateSelectRow);
  } catch (error) {
    if (supportsCoverDesign || !("coverDesignId" in payload)) {
      throw error;
    }

    const fallbackPayload = {...payload};
    delete fallbackPayload.coverDesignId;

    const [newTemplate] = await db
      .insert(templates)
      .values(fallbackPayload)
      .returning();

    return hydrateTemplateRow(newTemplate as TemplateSelectRow);
  }
}

export async function getTemplateById(id: string) {
  const columns = await selectTemplateColumns();
  const [template] = await db
    .select(columns)
    .from(templates)
    .where(eq(templates.id, id));
  return hydrateTemplateRow(template as TemplateSelectRow);
}

export async function updateTemplate(
  id: string,
  userId: string,
  data: Partial<typeof templates.$inferInsert>,
) {
  const [supportsCoverDesign, supportsExperimentName, supportsIndexRows] =
    await Promise.all([
      hasCoverDesignColumn(),
      hasExperimentNameColumn(),
      hasIndexRowsColumn(),
    ]);
  const {experimentName, indexRows, ...baseData} = data as Partial<
    typeof templates.$inferInsert
  > & {
    experimentName?: string;
    indexRows?: IndexRow[];
  };
  const payload: Partial<typeof templates.$inferInsert> = {
    ...baseData,
    updatedAt: new Date(),
  };

  if (supportsExperimentName && "experimentName" in data) {
    payload.experimentName = experimentName?.trim() || "";
  }

  if (supportsCoverDesign && "coverDesignId" in data) {
    payload.coverDesignId = data.coverDesignId || DEFAULT_COVER_PAGE_DESIGN;
  }

  if (supportsIndexRows && indexRows !== undefined) {
    payload.indexRows = indexRows;
  }

  try {
    const [updatedTemplate] = await db
      .update(templates)
      .set(payload)
      .where(and(eq(templates.id, id), eq(templates.createdBy, userId)))
      .returning();
    return updatedTemplate
      ? hydrateTemplateRow(updatedTemplate as TemplateSelectRow)
      : undefined;
  } catch (error) {
    if (supportsCoverDesign || !("coverDesignId" in payload)) {
      throw error;
    }

    const fallbackPayload = {...payload};
    delete fallbackPayload.experimentName;
    delete fallbackPayload.coverDesignId;

    const [updatedTemplate] = await db
      .update(templates)
      .set(fallbackPayload)
      .where(and(eq(templates.id, id), eq(templates.createdBy, userId)))
      .returning();

    return updatedTemplate
      ? hydrateTemplateRow(updatedTemplate as TemplateSelectRow)
      : undefined;
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
  const columns = await selectTemplateColumns();
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
}

export async function getAllTemplates() {
  const columns = await selectTemplateColumns();
  const rows = await db.select(columns).from(templates);

  return rows.map((row) => hydrateTemplateRow(row as TemplateSelectRow));
}
