# Stack & Architecture

Next.js 16 App Router · TypeScript · Drizzle ORM · Tailwind CSS v4 · shadcn/ui

- **Server Components:** Default to Server Components; use `'use client'` only when client-side interactivity/state is strictly required.
- **Suspense & Skeletons:** Dynamic parts must be wrapped in Suspense boundaries with skeleton loading states; static parts render immediately.
- **Structure:**
  - `/app` → Route handlers and pages; co-locate route components in `_components/` within each route folder.
  - `/components` → Shared reusable UI components.
  - `/lib` → Utilities (`utils.ts`, `safe-action.ts`).
  - `/types` → Shared TypeScript interfaces (`interface` over `type`, named exports only).
- **Mutations & Data:**
  - Mutations must be handled via server actions wrapped in `next-safe-action` (`src/lib/safe-action.ts`).
  - Pure database queries decoupled in `src/app/queries/` and `src/lib/queries/`.
  - Validate all inputs using Zod schemas from `src/lib/validations/`.
  - `try/catch` with proper error boundaries across all data-fetching boundaries.
- **Specific Technologies:**
  - **Auth:** `better-auth`; Onboarding (`src/app/(auth)/onboarding/`) is mandatory before dashboard access.
  - **Database:** Drizzle ORM + PostgreSQL (`@neondatabase/serverless`); schemas in `src/db/schema.ts`.
  - **PDF Generation:** `@react-pdf/renderer` primitives inside `src/components/pdf/` (Top Sheet, Cover Page, Index Page).

---

# Permanent Project Rules

### 1. Plan Review & Permission Gate (Highest Priority)
Before coding any feature, architectural, schema, API, or structural changes:
- **Do NOT code immediately.**
- Show the user:
  - **What Will Be Built:** Summary of what will be executed.
  - **Proposed File Changes:** Exact files to create or modify.
  - **UI Level:** What changes for the user (routes, components, visual states).
  - **Technical Level:** What changes internally (components, state, actions, schema, data flow).
- **Wait for user review & permission:** The user must review if what will be built matches their vision before any code is written.
- Small, isolated bug fixes or cosmetic tweaks do not require a formal permission gate.

### 2. Choice Architecture
- For fixed options with 2–3 choices: **never use `<Select>` / dropdowns.**
- Use `RadioGroup`, segmented controls, or direct 1-click controls.

### 3. Zero-Fluff & Human-Readable UI
- Keep labels and option titles to **1–3 words** where possible. No unnecessary subtitles or helper text.
- Never expose internal IDs, technical keys, or database identifiers in user-facing UI; always display human-readable labels.

### 4. Palette & Component Consolidation
- Do not create duplicate tools or components for minor variations.
- Prefer one reusable base component with variants and configurations.

### 5. Non-Destructive Changes
- Never break existing saved data, templates, records, or functionality unnecessarily.
- For breaking changes, explain the impact and obtain permission first.

### 6. Styling & Aesthetics
- Use **shadcn/ui primitives** and `cn()` from `src/lib/utils.ts`.
- Prefer solid backgrounds, borders, and shadows. **No glassmorphism.**
- No inline styles, no comments, no aria attributes, no raw HTML elements.
- Mobile-first responsive design; animated Lucide icons or hugeicons when useful (no custom SVGs).

### 7. Modularity & Engineering Principles
- Target **~100 lines/file** where practical; **~200–300 lines** is the upper boundary.
- Follow **SOLID · DRY · KISS · YAGNI** — make the smallest change that solves the problem.
- Preserve existing behavior; reuse canonical helpers before creating new ones.

### 8. Verification & Post-Implementation Guide
- Verify every change before declaring done (run `node scripts/verify.mjs` or `tsc --noEmit` + `npm run lint`).
- Provide an exact UI testing walkthrough (Where to go, What to click, What to expect) and report verification checks.

### 9. Mandatory Post-Coding Review
- After every coding session, run the `/thermo-nuclear-code-quality-review` skill.
- Treat review findings as hypotheses: inspect code, fix root causes of actionable findings, and re-verify.
- If fixing a finding requires a major architectural, schema, or database change, STOP and observe the Permission Gate.

---

# Feature Development Workflow

When implementing new features, enhancements, or multi-step tasks, follow the dedicated skill:
```text
/feature-implementation
```
Workflow cycle: **Understand → Plan → Permission Gate → Small-Step Implementation → Verify → UI Walkthrough → Next Step → Thermo Nuclear Review → Fix → Final Verification**.

---

# Skills Reference & When to Use

Use the specialized skills in `.agents/skills/` for their designated domains:

| Skill | When to Use |
| :--- | :--- |
| **`/feature-implementation`** | **End-to-end features:** Orchestrates Understand → Plan → Permission Gate → Small Step → Verify → Quality Review. |
| **`/thermo-nuclear-code-quality-review`** | **Post-coding audit (Mandatory):** Deep inspection of abstraction health, file size (<300 lines), and spaghetti code removal. |
| **`/nextjs-16`** & **`nextjs-16-complete-guide`** | **Next.js & React 19 architecture:** Server components, App Router, caching (`use cache`), Turbopack, safe server actions. |
| **`/frontend-design`** & **`design-taste-frontend`** | **Page & component creation:** High-polish, anti-slop visual styling, clean layouts, and non-templated UI. |
| **`/emil-design-eng`** | **Micro-interactions & animation:** Fluid transitions, framer-motion micro-interactions, spring physics, and tactile feel. |
| **`/landing-page-design`** | **Landing & marketing pages:** Hero sections, conversion psychology, above-the-fold layout, and student onboarding flow. |
| **`/web-design-guidelines`** | **UX & accessibility audit:** Form ergonomics, mobile responsiveness, touch targets, and Web Interface Guidelines compliance. |
| **`/deslop`** | **Code cleanup & deduplication:** Removing AI boilerplate, excessive wrappers, unnecessary indirection, and redundant comments. |
| **`/grill-with-docs`** | **Pre-planning & domain alignment:** Stress-testing architectural plans against `CONTEXT.md` / `PRD.md` before coding. |
| **`/caveman`** | **Token conservation:** Ultra-brief communication when token efficiency or rapid iterations are needed. |
