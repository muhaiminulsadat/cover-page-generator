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
      studentId: {
        type: "string",
      },
      university: {
        type: "string",
      },
      department: {
        type: "string",
      },
      level: {
        type: "string",
      },
      term: {
        type: "string",
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
});
