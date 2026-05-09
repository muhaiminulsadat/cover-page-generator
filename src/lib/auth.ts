import {db} from "@/db";
import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";

interface ProfileCompletionInput {
  studentId?: string | null;
  university?: string | null;
  department?: string | null;
  section?: string | null;
  subsection?: string | null;
  level?: string | null;
  term?: string | null;
  hscBatch?: string | null;
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  trustedOrigins: ["**"],

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
      studentId: {
        type: "string",
      },
      university: {
        type: "string",
      },
      department: {
        type: "string",
      },
      section: {
        type: "string",
      },
      subsection: {
        type: "string",
      },
      level: {
        type: "string",
      },
      term: {
        type: "string",
      },
      hscBatch: {
        type: "string",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
});

export function hasCompletedProfile(user: ProfileCompletionInput) {
  return Boolean(
    user.studentId &&
    user.university &&
    user.department &&
    user.section &&
    user.subsection &&
    user.level &&
    user.term &&
    user.hscBatch,
  );
}
