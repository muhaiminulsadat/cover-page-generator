import {z} from "zod";

export const createTemplateSchema = z.object({
  courseNumber: z.string().min(1, "Course Number is required (e.g. CE 332)"),
  courseTitle: z.string().min(1, "Course Title is required"),
  sessionTerm: z
    .string()
    .min(1, "Session/Term is required (e.g. January 2026)"),

  // Metadata for targeting
  departmentTarget: z.string().optional(),
  levelTarget: z.string().optional(),
  termTarget: z.string().optional(),
  sectionTarget: z.string().optional(),
  subsectionTarget: z.string().optional(),

  // Explicitly 2 teachers
  teacher1Name: z.string().min(1, "Teacher 1 Name is required"),
  teacher1Designation: z.string().min(1, "Teacher 1 Designation is required"),
  teacher2Name: z.string().optional(),
  teacher2Designation: z.string().optional(),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
