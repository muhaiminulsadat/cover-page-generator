ALTER TABLE "templates" ADD COLUMN "design_id" text DEFAULT 'classic-v1' NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "cover_design_id" text DEFAULT 'cover-classic-v1' NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "include_top_page" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "include_cover_page" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "include_index_page" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "templates" ADD COLUMN "experiment_names" text[] DEFAULT '{}'::text[] NOT NULL;