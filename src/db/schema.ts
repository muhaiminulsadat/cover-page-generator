import {sql} from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const user = t.pgTable("user", {
  id: t.text("id").primaryKey(),
  email: t.text("email").notNull().unique(),
  name: t.text("name").notNull(),
  role: t.text("role").notNull().default("student"),
  emailVerified: t.boolean("email_verified").notNull().default(false),
  image: t.text("image"),
  studentId: t.text("student_id"),
  university: t.text("university"),
  department: t.text("department"),
  section: t.text("section"),
  subsection: t.text("subsection"),
  groupNo: t.text("group_no"),
  level: t.text("level"),
  term: t.text("term"),
  hscBatch: t.text("hsc_batch"),
  banned: t.boolean("banned"),
  banReason: t.text("ban_reason"),
  banExpires: t.timestamp("ban_expires"),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
});

export const session = t.pgTable("session", {
  id: t.text("id").primaryKey(),
  userId: t.text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  token: t.text("token").notNull().unique(),
  expiresAt: t.timestamp("expires_at").notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
});

export const account = t.pgTable("account", {
  id: t.text("id").primaryKey(),
  userId: t.text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
  scope: t.text("scope"),
  idToken: t.text("id_token"),
  password: t.text("password"),
  createdAt: t.timestamp("created_at").notNull(),
  updatedAt: t.timestamp("updated_at").notNull(),
});

export const verification = t.pgTable("verification", {
  id: t.text("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t
    .timestamp("expires_at", {precision: 6, withTimezone: true})
    .notNull(),
  createdAt: t
    .timestamp("created_at", {precision: 6, withTimezone: true})
    .notNull(),
  updatedAt: t
    .timestamp("updated_at", {precision: 6, withTimezone: true})
    .notNull(),
});

export const templates = t.pgTable("templates", {
  id: t.text("id").primaryKey(),
  designId: t.text("design_id").notNull().default("classic-v1"),
  coverDesignId: t.text("cover_design_id").notNull().default("cover-classic-v1"),
  courseNumber: t.text("course_number").notNull(),
  courseTitle: t.text("course_title").notNull(),
  sessionTerm: t.text("session_term").notNull(),
  departmentTarget: t.text("department_target"),
  levelTarget: t.text("level_target"),
  termTarget: t.text("term_target"),
  hscBatchTarget: t.text("hsc_batch_target"),
  sectionTarget: t.text("section_target"),
  subsectionTarget: t.text("subsection_target"),
  createdBy: t.text("created_by")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  teacher1Name: t.text("teacher_1_name").notNull(),
  teacher1Designation: t.text("teacher_1_designation").notNull(),
  teacher2Name: t.text("teacher_2_name"),
  teacher2Designation: t.text("teacher_2_designation"),
  includeTopPage: t.boolean("include_top_page").notNull().default(true),
  includeCoverPage: t.boolean("include_cover_page").notNull().default(true),
  includeIndexPage: t.boolean("include_index_page").notNull().default(true),
  experimentNames: t.text("experiment_names").array().notNull().default(sql`'{}'::text[]`),
  createdAt: t.timestamp("created_at").notNull().defaultNow(),
  updatedAt: t.timestamp("updated_at").notNull().defaultNow(),
});

export const downloadLogs = t.pgTable("download_logs", {
  id: t.text("id").primaryKey(),
  templateId: t
    .text("template_id")
    .notNull()
    .references(() => templates.id, {onDelete: "cascade"}),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  deviceType: t.text("device_type"),
  browser: t.text("browser"),
  downloadedAt: t.timestamp("downloaded_at").notNull().defaultNow(),
});

