import {z} from "zod";

export const userProfileSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  department: z.string().min(1, "Department is required"),
  section: z.string().min(1, "Section is required"),
  subsection: z.string().optional(),
  groupNo: z.string().optional(),
  level: z.string().min(1, "Level is required"),
  term: z.string().min(1, "Term is required"),
  hscBatch: z.string().optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
