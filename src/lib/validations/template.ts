import {z} from "zod";
import {DEPARTMENT_VALUES} from "@/lib/constants/departments";
import {HSC_BATCH_VALUES} from "@/lib/constants/hsc-batches";
import {
  LEVEL_VALUES,
  SECTION_VALUES,
  SUBSECTION_VALUES,
  TERM_VALUES,
} from "@/lib/constants/levels";

export const createTemplateSchema = z.object({
  courseNumber: z.string().min(1, "Course Number is required (e.g. CE 332)"),
  courseTitle: z.string().min(1, "Course Title is required"),
  sessionTerm: z
    .string()
    .min(1, "Session/Term is required (e.g. January 2026)"),

  // Metadata for targeting
  departmentTarget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        DEPARTMENT_VALUES.includes(value as (typeof DEPARTMENT_VALUES)[number]),
      "Please select a valid department",
    ),
  levelTarget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || LEVEL_VALUES.includes(value as (typeof LEVEL_VALUES)[number]),
      "Please select a valid level",
    ),
  termTarget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || TERM_VALUES.includes(value as (typeof TERM_VALUES)[number]),
      "Please select a valid term",
    ),
  sectionTarget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        SECTION_VALUES.includes(value as (typeof SECTION_VALUES)[number]),
      "Please select a valid section",
    ),
  subsectionTarget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        SUBSECTION_VALUES.includes(value as (typeof SUBSECTION_VALUES)[number]),
      "Please select a valid subsection",
    ),
  hscBatchTarget: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        HSC_BATCH_VALUES.includes(value as (typeof HSC_BATCH_VALUES)[number]),
      "Please select a valid HSC batch",
    ),

  // Explicitly 2 teachers
  teacher1Name: z.string().min(1, "Teacher 1 Name is required"),
  teacher1Designation: z.string().min(1, "Teacher 1 Designation is required"),
  teacher2Name: z.string().optional(),
  teacher2Designation: z.string().optional(),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;

export const editTemplateSchema = createTemplateSchema.extend({
  id: z.string().min(1, "Template ID is required"),
});

export type EditTemplateInput = z.infer<typeof editTemplateSchema>;
