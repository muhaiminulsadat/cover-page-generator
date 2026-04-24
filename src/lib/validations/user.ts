import {z} from "zod";
import {UNIVERSITY_VALUES} from "@/lib/constants/universities";
import {DEPARTMENT_VALUES} from "@/lib/constants/departments";
import {HSC_BATCH_VALUES} from "@/lib/constants/hsc-batches";
import {
  LEVEL_VALUES,
  SECTION_VALUES,
  SUBSECTION_VALUES,
  TERM_VALUES,
} from "@/lib/constants/levels";

export const userProfileSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  university: z
    .string()
    .min(1, "University is required")
    .refine(
      (value) =>
        UNIVERSITY_VALUES.includes(value as (typeof UNIVERSITY_VALUES)[number]),
      "Please select a valid university",
    ),
  department: z
    .string()
    .min(1, "Department is required")
    .refine(
      (value) =>
        DEPARTMENT_VALUES.includes(value as (typeof DEPARTMENT_VALUES)[number]),
      "Please select a valid department",
    ),
  section: z
    .string()
    .min(1, "Section is required")
    .refine(
      (value) =>
        SECTION_VALUES.includes(value as (typeof SECTION_VALUES)[number]),
      "Please select a valid section",
    ),
  subsection: z
    .string()
    .min(1, "Subsection is required")
    .refine(
      (value) =>
        SUBSECTION_VALUES.includes(value as (typeof SUBSECTION_VALUES)[number]),
      "Please select a valid subsection",
    ),
  groupNo: z.string().optional(),
  level: z
    .string()
    .min(1, "Level is required")
    .refine(
      (value) => LEVEL_VALUES.includes(value as (typeof LEVEL_VALUES)[number]),
      "Please select a valid level",
    ),
  term: z
    .string()
    .min(1, "Term is required")
    .refine(
      (value) => TERM_VALUES.includes(value as (typeof TERM_VALUES)[number]),
      "Please select a valid term",
    ),
  hscBatch: z
    .string()
    .min(1, "HSC batch is required")
    .refine(
      (value) =>
        HSC_BATCH_VALUES.includes(value as (typeof HSC_BATCH_VALUES)[number]),
      "Please select a valid HSC batch",
    ),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

export const userSettingsSchema = userProfileSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type UserSettingsInput = z.infer<typeof userSettingsSchema>;
