import {db} from "@/db";
import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";

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
