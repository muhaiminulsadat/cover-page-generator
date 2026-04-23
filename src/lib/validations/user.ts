import {z} from "zod";
import {UNIVERSITY_VALUES} from "@/lib/constants/universities";

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
  department: z.string().min(1, "Department is required"),
  section: z.string().min(1, "Section is required"),
  subsection: z.string().optional(),
  groupNo: z.string().optional(),
  level: z.string().min(1, "Level is required"),
  term: z.string().min(1, "Term is required"),
  hscBatch: z.string().optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
