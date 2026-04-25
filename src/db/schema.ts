import {pgTable, text, boolean, timestamp, jsonb} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("student"),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  studentId: text("student_id"),
  university: text("university"),
  department: text("department"),
  section: text("section"),
  subsection: text("subsection"),
  groupNo: text("group_no"),
  level: text("level"),
  term: text("term"),
  hscBatch: text("hsc_batch"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  idToken: text("id_token"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
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

export const templates = pgTable("templates", {
  id: text("id").primaryKey(),
  designId: text("design_id").notNull().default("classic-v1"),
  coverDesignId: text("cover_design_id").notNull().default("cover-classic-v1"),
  courseNumber: text("course_number").notNull(),
  courseTitle: text("course_title").notNull(),
  sessionTerm: text("session_term").notNull(),
  experimentName: text("experiment_name").notNull().default(""),
  departmentTarget: text("department_target"),
  levelTarget: text("level_target"),
  termTarget: text("term_target"),
  hscBatchTarget: text("hsc_batch_target"),
  sectionTarget: text("section_target"),
  subsectionTarget: text("subsection_target"),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id, {onDelete: "cascade"}),
  teacher1Name: text("teacher_1_name").notNull(),
  teacher1Designation: text("teacher_1_designation").notNull(),
  teacher2Name: text("teacher_2_name"),
  teacher2Designation: text("teacher_2_designation"),
  indexRows: jsonb("index_rows").notNull().default("[]"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
