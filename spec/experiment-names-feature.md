# Technical Specification: Experiment Names in Index Page

## 1. Overview
Currently, the "Index Page" of the generated PDF contains 10 blank rows for students to manually write experiment names. This feature allows template creators to pre-fill these experiment names during template creation. If no names are provided, the system will continue to provide blank rows (defaulting to 12).

## 2. Goals
- Allow template creators to add, edit, and reorder experiment names.
- Display these names in the generated Index Page PDF.
- Maintain the "blank row" fallback for handwriting if names are not provided.
- Support at least 12 rows by default, even if fewer names are provided.

## 3. Technical Changes

### 3.1 Database Schema (`src/db/schema.ts`)
- Add `experimentNames` column to the `templates` table.
- **Type**: `text("experiment_names").array()` or `jsonb("experiment_names")`. 
- **Default**: `[]`.
- *Note*: Using PostgreSQL array `text[ ]` is preferred for a simple list of strings.

### 3.2 Validation (`src/lib/validations/template.ts`)
- Update `createTemplateSchema` and `editTemplateSchema` to include `experimentNames`.
- **Validation**: `z.array(z.string()).optional().default([])`.

### 3.3 UI Components
#### Template Form (`src/app/templates/[id]/edit/page.tsx` and create page)
- Add a "Experiments" section.
- Use a dynamic field array (e.g., `useFieldArray` from `react-hook-form`).
- Allow users to add new experiment names, remove them, and potentially reorder them.
- Maximum number of experiments: 15-20 (to fit on one page) or handle multi-page index (out of scope for now, let's stick to 10-15).

#### PDF Rendering (`src/components/pdf/index-page/designs/classic-v1.tsx`)
- Modify `renderClassicV1IndexPage` to:
    1. Receive `experimentNames` from the `template` object.
    2. Determine the number of rows to render: `Math.max(10, template.experimentNames.length)`.
    3. Map over the rows and fill the "Name of the Experiment" column with the provided name or a blank space.

### 3.4 API Actions (`src/app/actions/template.ts` & `src/lib/queries/template.ts`)
- Ensure `experimentNames` is handled in `insertTemplate` and `updateTemplate`.

## 4. Implementation Steps
1. **Database Migration**:
    - Update `schema.ts`.
    - Run `npx drizzle-kit generate` and `npx drizzle-kit push`.
2. **Schema & Types**:
    - Update Zod schemas in `validations/template.ts`.
    - Update TypeScript interfaces in `src/components/pdf/core/types.ts` if needed.
3. **Form Integration**:
    - Implement the dynamic experiment name inputs in the template form.
4. **PDF Engine**:
    - Update the index page renderer to display the names.
5. **Testing**:
    - Create a template with 5 experiments -> check PDF for 5 names + 5 blanks.
    - Create a template with 0 experiments -> check PDF for 10 blanks.
    - Create a template with 12 experiments -> check PDF for 12 names.

## 5. UI/UX Design
- The experiment names input should be intuitive.
- Each name should have a "Remove" button.
- An "Add Experiment" button at the bottom of the list.
- A placeholder like "Experiment 1: Basic Logic Gates" to guide the user.
