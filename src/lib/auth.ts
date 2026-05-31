import {db} from "@/db";
import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {admin} from "better-auth/plugins";
import {ac, adminAc, moderatorAc, studentAc, superadminAc} from "./permissions";
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
  plugins: [
    admin({
      ac,
      roles: {
        student: studentAc,
        moderator: moderatorAc,
        admin: adminAc,
        superadmin: superadminAc,
      },
      defaultRole: "student",
      adminRoles: ["admin", "superadmin"],
    }),
  ],
});
