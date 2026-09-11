---
name: feature-implementation
description: Reusable end-to-end feature development workflow for Antigravity IDE. Use whenever implementing a new feature, major enhancement, or multi-step task to ensure understanding, phased planning, permission gating, small-step implementation, testing walkthroughs, and post-coding thermo-nuclear quality review.
---

# Feature Implementation Workflow

This skill defines the non-negotiable end-to-end workflow for implementing features in this project. Follow this workflow systematically from start to finish, activating the designated skills at each step.

```text
Understand requirement ───────────────────► [/grill-with-docs]
        ↓
Inspect relevant code ────────────────────► [/nextjs-16]
        ↓
Create small implementation plan ─────────► [/nextjs-16]
        ↓
Explain UI Level + Technical Level
        ↓
Ask for permission (Permission Gate)
        ↓
Implement one small step:
  ├─ Architecture & Data ─────────────────► [/nextjs-16]
  ├─ UI & Layout ─────────────────────────► [/frontend-design, /design-taste-frontend]
  ├─ Micro-interactions & Polish ─────────► [/emil-design-eng]
  └─ Landing / Onboarding ────────────────► [/landing-page-design]
        ↓
Make that step fully testable
        ↓
Verify (`node scripts/verify.mjs`) ───────► [/web-design-guidelines]
        ↓
Tell me exactly how to test it in the UI
        ↓
Continue with next step
        ↓
Run code-quality review ──────────────────► [/thermo-nuclear-code-quality-review]
        ↓
Fix all actionable findings ──────────────► [/deslop]
        ↓
Verify again (`node scripts/verify.mjs`)
        ↓
Report completion
```

---

## Phase A — Understand

**Skills to use at this step:**

- **`/grill-with-docs`**: When domain terminology, student onboarding flow, or lab group rules are ambiguous — verify against `CONTEXT.md` and `PRD.md` before coding.

**Step actions:**

1. **Clarify Requirements**: Understand the requested feature, user goals, and acceptance criteria.
2. **Targeted Inspection**: Inspect only the files and directories relevant to the feature.
   - Do NOT read the entire repository unnecessarily.
   - Follow imports and references strictly from the entry point.
3. **Map Dependencies**: Identify affected frontend components, backend logic (server actions, queries), database schemas, and shared utilities.
4. **Identify Reusable Patterns**: Check existing UI components, forms, validation schemas, and database queries. Reuse existing patterns rather than creating duplicates.

---

## Phase B — Plan

**Skills to use at this step:**

- **`/nextjs-16`** & **`/nextjs-16-complete-guide`**: For planning Server Components vs Client Components, Suspense skeleton boundaries, `use cache` profiles, and server action validations.

**Step actions:**

1. **Break Into Small Steps**: Divide the work into distinct, manageable steps.
2. **Coupled Frontend & Backend**: Each step must connect both frontend and backend functionality where required. Avoid implementing all UI upfront while indefinitely postponing backend logic.
3. **Independently Testable**: Every step must leave the application in a working, testable state.
4. **No Premature Execution**: Do not begin implementation until the plan is reviewed and permission is granted.

---

## Phase C — Plan Review & Permission Gate (Highest Priority)

**Skills to use at this step:**

- **`/caveman`** _(Optional)_: If the user requests token-compressed or rapid interaction, format the gate with ultra-brief technical accuracy.

**Step actions:**

Before writing or modifying any code:

> [!IMPORTANT]
> **Do NOT write code immediately.** You must first show the user exactly what you intend to build, explain the UI Level and Technical Level impact, and wait for them to review and confirm whether the plan matches their vision.

Present the proposed execution plan in this exact format:

```markdown
### What Will Be Built
- Clear, 2-3 sentence summary of what this step will build and accomplish.

### Proposed File Changes
- `[NEW]` path/to/new-file.tsx — Purpose of file.
- `[MODIFY]` path/to/existing-file.ts — What will be added or modified.

### UI Level
- What the user will see, interact with, or experience after this change.
- Specific routes, layouts, forms, buttons, or states affected.

### Technical Level
- Components to create or modify.
- State management and data flow.
- Server actions, API endpoints, and validation schemas (`zod`).
- Database schema changes (`drizzle/schema.ts`) and migrations.
- Architecture and boundary adjustments.
```

- Explicitly ask:
  > **"Please review the plan above. Does this accurately match what you want built, and do you grant permission to proceed with Step [N]?"**
- **STOP and wait** for the user's explicit review and permission.
- If the user requests adjustments, refine the plan and present it again. Do not proceed until approved.
- _Exception_: Small, isolated bug fixes or cosmetic styling tweaks do not require a formal permission gate.

---

## Phase D — Small-Step Implementation & Verification

Once permission is granted, implement the approved step utilizing the designated skill for each sub-domain:

### Step D.1 — Backend, Data & Routing

- **Skill to use**: **`/nextjs-16`**
- Handle mutations via server actions wrapped in `next-safe-action` (`src/lib/safe-action.ts`).
- Decouple pure database fetching functions into `src/app/queries/` and `src/lib/queries/`.
- Validate all inputs using Zod schemas from `src/lib/validations/`.
- Use Drizzle ORM schemas in `src/db/schema.ts`.

### Step D.2 — UI Layout & Component Styling

- **Skill to use**: **`/frontend-design`** & **`/design-taste-frontend`**
- Use Shadcn UI primitives and `cn()` from `src/lib/utils.ts`.
- Solid backgrounds, borders, and subtle shadows. **No glassmorphism.**
- Server Components by default; use `'use client'` only where interactivity is required.
- Wrap dynamic areas in Suspense with skeleton loading states.
- Choice architecture: RadioGroup / segmented controls for 2–3 options; never `<Select>`.
- Concise copy: 1–3 words for labels; human-readable labels instead of internal IDs.

### Step D.3 — Micro-Interactions & Animation

- **Skill to use**: **`/emil-design-eng`**
- Add fluid transitions, spring micro-interactions, responsive button feedback, and modal open/close states.

### Step D.4 — Landing Pages & Funnels (If Applicable)

- **Skill to use**: **`/landing-page-design`**
- When working on landing pages, hero sections, or onboarding conversion flows: apply above-the-fold layout rules, social proof placement, and CTA psychology.

### Step D.5 — Verification & Accessibility Check

- **Skill to use**: **`/web-design-guidelines`**
- Check mobile responsiveness, touch target sizes (≥44px), form ergonomics, and keyboard navigation.
- Execute mechanical verification:
  ```bash
  node scripts/verify.mjs
  ```
- Present a clear, human-readable testing guide formatted as:

```markdown
### How to test

1. Go to [URL or Page]
2. Click [Button or Element]
3. Enter [Data or Selection]
4. Click [Submit / Action]
5. You should see [Expected Result]

### Verification

- Typecheck: PASS
- Lint: PASS
- Build: PASS (only list checks actually performed)
```

- **Await Direction**: Pause and wait for user testing feedback before continuing to the next step.

---

## Phase E — Mandatory Code Quality Review

**Skills to use at this step:**

- **`/thermo-nuclear-code-quality-review`** _(Mandatory)_: Deep structural inspection.
- **`/deslop`**: Code cleanup and deduplication.

**Step actions:**

1. **Invoke Review**: Execute the `/thermo-nuclear-code-quality-review` skill.
2. **Evaluate Findings**:
   - Treat findings as hypotheses; read the underlying code before making changes.
   - Do not merely report findings — determine which are valid and actionable.
3. **Fix Actionable Issues with `/deslop`**:
   - Eliminate unnecessary wrappers, boilerplate, and pass-through indirection.
   - Decompose files that exceed ~200–300 lines into focused sub-modules.
   - Replace spaghetti conditionals with dedicated helpers or typed models.
   - Do not suppress linter or compiler warnings with `as any`, `@ts-ignore`, or `eslint-disable` simply to pass.
4. **Permission Gate During Fixes**:
   - If resolving a finding requires a structural, architectural, schema, or breaking change:
     **STOP immediately**, explain the UI Level + Technical Level impact, and ask for permission before modifying code.
5. **Re-Verify**:
   - Run `node scripts/verify.mjs` again to ensure all tests, types, and lints pass cleanly.

---

## Phase F — Completion Report

Present a concise completion report:

- How to check what you have done in UI level
- Summary of the completed feature/step.
- Verification status (Typecheck, Lint).
- Any next steps or follow-ups for the user.
