CREATE TABLE "templates" (
	"id" text PRIMARY KEY NOT NULL,
	"course_number" text NOT NULL,
	"course_title" text NOT NULL,
	"session_term" text NOT NULL,
	"department_target" text,
	"level_target" text,
	"term_target" text,
	"section_target" text,
	"subsection_target" text,
	"created_by" text NOT NULL,
	"teacher_1_name" text NOT NULL,
	"teacher_1_designation" text NOT NULL,
	"teacher_2_name" text,
	"teacher_2_designation" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "student_id" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "department" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "section" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "subsection" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "group_no" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "level" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "term" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hsc_batch" text;--> statement-breakpoint
ALTER TABLE "templates" ADD CONSTRAINT "templates_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;