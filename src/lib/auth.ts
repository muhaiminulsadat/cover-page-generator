import {db} from "@/db";
import {betterAuth} from "better-auth";
import {drizzleAdapter} from "better-auth/adapters/drizzle";
import {admin} from "better-auth/plugins";
import {ac, adminAc, moderatorAc, studentAc, superadminAc} from "./permissions";
import {sendResetPasswordEmail} from "@/lib/email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  trustedOrigins: ["**"],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

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
    sendResetPassword: async ({ user, url }) => {
      let resetUrl = url;
      if (process.env.NEXT_PUBLIC_BASE_URL) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
        resetUrl = url.replace(/https?:\/\/localhost:\d+/, baseUrl);
      }
      await sendResetPasswordEmail(user.email, user.name, resetUrl);
    },
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
