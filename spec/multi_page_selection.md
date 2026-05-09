# Implementation Plan: Multi-Page Template Selection

This document outlines the plan to implement a feature that allows template creators to choose which pages (Top Page, Index Page, Cover Page) to include in their templates.

## 1. Objectives

- Allow template creators to select/deselect specific pages during template creation and editing.
- Ensure that by default, all pages are selected.
- Dynamically generate the PDF output based on the selected pages.
- Only allow end-users to download the pages selected by the template creator.

## 2. Technical Requirements

### 2.1 Database Schema (`src/db/schema.ts`)

Add the following boolean columns to the `templates` table:

- `includeTopPage`: `boolean`, default `true`
- `includeCoverPage`: `boolean`, default `true`
- `includeIndexPage`: `boolean`, default `true`

### 2.2 Validation Schema (`src/lib/validations/template.ts`)

Update `createTemplateSchema` and `editTemplateSchema` to include the new boolean fields:

- `includeTopPage`: `z.boolean().default(true)`
- `includeCoverPage`: `z.boolean().default(true)`
- `includeIndexPage`: `z.boolean().default(true)`

### 2.3 Database Queries (`src/lib/queries/template.ts`)

- Update `TemplateQueryRow` and `TemplateSelectRow` interfaces to include the new fields.
- Update `templateColumnsWithoutCover` and `templateColumnsWithCover` to select the new columns.
- Ensure `insertTemplate` and `updateTemplate` handle the new fields correctly.

### 2.4 Server Actions (`src/app/actions/template.ts`)

- The actions should automatically handle the new fields through the updated schema and query functions.

### 2.5 UI Components (Forms)

Update both `CreateTemplateForm.tsx` and `EditTemplateForm.tsx`:

- Add a new section "Page Selection" with three checkboxes (using shadcn/ui `Checkbox` component).
- Labels: "Include Top Page", "Include Cover Page", "Include Index Page".
- Bind these to the form state using `react-hook-form`.

### 2.6 PDF Generation (`src/components/pdf/CoverPageDocument.tsx`)

Modify the `CoverPageDocument` component to conditionally render pages:

- Render Top Sheet only if `template.includeTopPage` is true.
- Render Cover Page only if `template.includeCoverPage` is true.
- Render Index Page only if `template.includeIndexPage` is true.

## 3. Implementation Steps

1. **Schema Migration**:
   - Update `src/db/schema.ts`.
   - Run `npx drizzle-kit generate` and `npx drizzle-kit push` (or similar command used in the project).

2. **Validation & Queries**:
   - Update `src/lib/validations/template.ts`.
   - Update `src/lib/queries/template.ts`.

3. **Form Updates**:
   - Add checkboxes to `CreateTemplateForm.tsx`.
   - Add checkboxes to `EditTemplateForm.tsx`.

4. **PDF Logic**:
   - Update `CoverPageDocument.tsx` with conditional rendering logic.

5. **Testing**:
   - Create a template with only Top Page and Cover Page selected.
   - Verify the preview only shows these two pages.
   - Verify the downloaded PDF only contains these two pages.
   - Repeat with different combinations.

## 4. Considerations

- **Default Behavior**: When creating a new template, all checkboxes should be checked by default.
- **Preview UX**: The PDF viewer in the browser should accurately reflect the selection in real-time if possible (though `PDFViewer` might need a full reload of the document props).
- **Validation**: At least one page must be selected. Add a refinement to the schema to ensure this.
