## Plan: CoverIt Full-Stack Implementation (Modular, Best Practices)

This implementation guide follows senior-level engineering practices:
- **Separation of Concerns:** Clear boundaries between Database (Drizzle), Validation (Zod), Server Actions (next-safe-action or native), and UI.
- **Type Safety:** Shared Drizzle/Zod schemas ensuring end-to-end type safety.
- **Atomic Components:** Reusable `shadcn/ui` components wrapping client-side logic.
- **Constraints:** Strict schema enforcement (e.g., exactly two teachers per template via columns).

### Phase 1: Foundation & Data Layer
1.  **Extend `users` Table:** Add academic fields to `src/db/schema.ts` via the `user` table (`student_id`, `department`, `section`, `subsection`, `group_no`, `level`, `term`, `hsc_batch`).
2.  **Create `templates` Table:** Add `templates` to `src/db/schema.ts`. Instead of a JSON array, use strictly 4 columns for the two required teachers: `teacher_1_name`, `teacher_1_designation`, `teacher_2_name`, and `teacher_2_designation`, optimizing read queries and forcing strict constraints.
3.  **Database Migration:** Run `npx drizzle-kit generate` and `npx drizzle-kit push` (or migrate).
4.  **Zod Schema Contracts:** Create `src/lib/validations/user.ts` and `src/lib/validations/template.ts` representing the shared contract for forms and actions.

### Phase 2: Core Auth & Onboarding Flow
1.  **Auth Guards:** Implement Next.js middleware (`src/middleware.ts`) or a layout guard to ensure protected routes are inaccessible without auth.
2.  **Profile Action:** Create a modular server action in `src/app/actions/user.ts` that uses the Zod schema to parse inputs and updates the `users` table safely. Handle Drizzle errors implicitly.
3.  **Onboarding Presenter & Form:** Create `src/components/forms/OnboardingForm.tsx` using `react-hook-form` and `@hookform/resolvers/zod`. Mount this inside `src/app/(auth)/onboarding/page.tsx`. Redirect initialized users based on a `hasCompletedProfile` check.

### Phase 3: Domain: Template Management
1.  **Template DAO (Data Access):** Create `src/app/queries/template.ts` for pure Drizzle fetching functions (e.g., `insertTemplate`).
2.  **Template Actions:** In `src/app/actions/template.ts`, create `createTemplateAction`, validate with Zod (validating 2 explicit teachers), and map to the DAO. Return standardized `{ success, error, data }` structures.
3.  **Template Form Component:** Build `src/components/forms/CreateTemplateForm.tsx`. With fixed columns, simply render field groups for Teacher 1 and Teacher 2—discarding complex `useFieldArray` implementations for better performance and simplicity.
4.  **Template Page:** Wrap the form in `src/app/templates/new/page.tsx`, utilizing a structured layout.

### Phase 4: Domain: Discovery & Dashboard
1.  **Filter DAO:** Implement `getTemplatesByMetadata()` in the template queries file, leveraging Drizzle's `eq` to match the current user's department, level, and section.
2.  **Dynamic Page Layout:** Build `src/app/(dashboard)/page.tsx` as a Server Component. Fetch data server-side and pass it to a Client Component if interactive filtering is needed, or keep entirely on the server using URL Query Params (`searchParams`).
3.  **Atomic Components:** Extract a highly decoupled `src/components/ui-custom/TemplateCard.tsx` to display course info cleanly, adhering to shadcn design principles. Add a Suspense boundary for loading states.

### Phase 5: PDF Generation & Preview
1.  **Dependency Addition:** Install `@react-pdf/renderer` for native-quality PDF rendering, dropping raw HTML-to-Canvas hacks.
2.  **Data Hydration:** In `src/app/templates/[id]/page.tsx`, run parallel queries `Promise.all([getUser(), getTemplate(id)])` to hydrate the preview.
3.  **Modular Preview Component:** Construct a pure presentational component `src/components/pdf/CoverPageWebPreview.tsx` utilizing strict Tailwind ratios (e.g., `w-[210mm] h-[297mm]`) scaled down for mobile.
4.  **React-PDF Integration:** Construct the actual PDF document inside `src/components/pdf/CoverPageDocument.tsx` using React-PDF primitives (`<Document>`, `<Page>`, `<Text>`) mirroring the Web UI, triggered via a unified download button.