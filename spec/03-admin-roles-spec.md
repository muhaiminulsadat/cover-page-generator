# Technical Specification: Admin Roles & Access Management

This document outlines the product requirements and technical design for implementing role-based access control (RBAC), administrative user management, and application analytics using Better Auth and Next.js 16 strictly.

---

## 1. Problem & Context

The Cover Page Generator currently operates on a flat user model where every authenticated user (`student`) has equal access to template CRUD and PDF generation. As the platform grows, this creates problems:

- **Template Integrity:** Any user can create templates, leading to duplicates and low-quality entries.
- **No Moderation Layer:** There is no way to designate trusted users who can manage templates on behalf of departments.
- **No Visibility:** Zero insight into how many downloads occur, which templates are popular, or how many users exist.

**Why Now:** The platform is gaining traction and needs governance before the template library becomes unmanageable.

---

## 2. Success Criteria

- Admins can promote/demote users between `student` and `moderator` roles from the Admin Panel.
- Superadmins can assign any role to any user and access system-wide analytics.
- `student` users can only browse templates and generate PDFs — they cannot create, edit, or delete templates.
- Every PDF download is tracked and surfaced in the Superadmin analytics dashboard.
- Superadmin can see which template is downloaded how many times, which device (Desktop/Mobile) and which browser (Chrome/Firefox/Safari/Edge/etc.) was used, and from which location in Bangladesh.
- Role checks are enforced on both server and client, with no bypass possible via direct API calls.

---

## 3. Roles & Permission Matrix

There are **4 roles**. The existing default role `student` is kept as-is (no migration needed).

| Feature / Action                          | Student | Moderator | Admin | Superadmin |
| :---------------------------------------- | :-----: | :-------: | :---: | :--------: |
| Browse templates & generate/download PDFs |   ✅    |    ✅     |  ✅   |     ✅     |
| Create templates                          |   ❌    |    ✅     |  ✅   |     ✅     |
| Edit/Delete **own** templates             |   ❌    |    ✅     |  ✅   |     ✅     |
| Edit/Delete **any** template              |   ❌    |    ❌     |  ❌   |     ✅     |
| Access Admin Panel                        |   ❌    |    ❌     |  ✅   |     ✅     |
| Change roles: Student ↔ Moderator         |   ❌    |    ❌     |  ✅   |     ✅     |
| Change roles: set Admin / Superadmin      |   ❌    |    ❌     |  ❌   |     ✅     |
| View application analytics                |   ❌    |    ❌     |  ❌   |     ✅     |

---

## 4. Key Decisions

| Decision                 | Choice                                                        |
| :----------------------- | :------------------------------------------------------------ |
| Default user role        | Keep `student` (no rename, no migration)                      |
| First Superadmin seeding | No need to do anything about it, i will do it later manually. |
| Download tracking        | Track every event (no deduplication)                          |
| Analytics visualization  | Recharts (bar charts, pie charts)                             |
| Admin Panel routing      | Dedicated `/admin` route group                                |
| Self-demotion            | Blocked — admins/superadmins cannot change their own role     |
| Ban/unban users          | Not in scope (can be added later)                             |
| Audit log for moderation | Not in scope (can be added later)                             |
| Access control approach  | Better Auth `createAccessControl` for structured RBAC         |
| Role key format          | `superadmin` (single lowercase word, no hyphens)              |

---

## 5. Technical Architecture

### 5.1 Access Control Definition (`src/lib/permissions.ts` — [NEW])

Define a shared access control configuration using Better Auth's `createAccessControl`. This file is imported by both the server auth config and used for client-side permission checks.

```typescript
import {createAccessControl} from "better-auth/plugins/access";

export const statement = {
  template: ["create", "update", "delete", "update:any", "delete:any"],
  user: ["setRole", "setRole:any"],
  analytics: ["view"],
  admin: ["access"],
} as const;

export const ac = createAccessControl(statement);

export const studentRole = ac.newRole({
  template: [],
  user: [],
  analytics: [],
  admin: [],
});

export const moderatorRole = ac.newRole({
  template: ["create", "update", "delete"],
  user: [],
  analytics: [],
  admin: [],
});

export const adminRole = ac.newRole({
  template: ["create", "update", "delete"],
  user: ["setRole"],
  analytics: [],
  admin: ["access"],
});

export const superadminRole = ac.newRole({
  template: ["create", "update", "delete", "update:any", "delete:any"],
  user: ["setRole", "setRole:any"],
  analytics: ["view"],
  admin: ["access"],
});
```

### 5.2 Better Auth Server Config (`src/lib/auth.ts` — [MODIFY])

Enable the `admin` plugin with custom access control and roles.

```typescript
import {admin} from "better-auth/plugins";
import {
  ac,
  studentRole,
  moderatorRole,
  adminRole,
  superadminRole,
} from "@/lib/permissions";

export const auth = betterAuth({
  // ... existing config
  plugins: [
    admin({
      ac,
      roles: {
        student: studentRole,
        moderator: moderatorRole,
        admin: adminRole,
        superadmin: superadminRole,
      },
      adminRoles: ["admin", "superadmin"],
    }),
  ],
});
```

### 5.3 Better Auth Client Config (`src/lib/auth-client.ts` — [MODIFY])

Register the `adminClient` plugin on the client-side for admin API access.

```typescript
import {adminClient} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // ... existing config
  plugins: [adminClient()],
});
```

### 5.4 Database Schema (`src/db/schema.ts` — [MODIFY])

**No changes to the `user` table.** The existing `role` column with default `"student"` is reused as-is.

**New table — `download_logs`:**

Tracks every PDF download event including device type and browser for the Superadmin analytics dashboard.

```typescript
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
```

- `deviceType`: `"desktop"` | `"mobile"` | `"tablet"` — parsed from User-Agent on the server.
- `browser`: `"Chrome"` | `"Firefox"` | `"Safari"` | `"Edge"` | `"Other"` — parsed from User-Agent on the server.

After schema changes: `npx drizzle-kit generate` → `npx drizzle-kit push`.

### 5.5 Zod Validations (`src/lib/validations/admin.ts` — [NEW])

```typescript
import {z} from "zod";

export const updateUserRoleSchema = z.object({
  targetUserId: z.string().min(1),
  newRole: z.enum(["student", "moderator", "admin", "superadmin"]),
});

export const logDownloadSchema = z.object({
  templateId: z.string().min(1),
});
```

### 5.6 Caching & Suspense Strategy

Following the existing project conventions (see `DashboardGrid` in `dashboard/page.tsx`), every async data-fetching Server Component **must** use the Next.js 16 `"use cache: remote"` directive, `cacheLife()`, and `cacheTag()` — and be wrapped in a `<Suspense>` boundary with a skeleton fallback.

#### Cache Invalidation Convention (Next.js 16)

| Context | API | When to use |
| :------ | :-- | :---------- |
| **Server Actions** (user-initiated mutations) | `updateTag(tag)` + `refresh()` | User just changed data — immediate, same-request invalidation |
| **Webhooks / Cron / Background jobs** | `revalidateTag(tag)` | Background refresh — slight delay is acceptable |

All cache invalidation in this feature happens inside Server Actions, so we use `updateTag()` + `refresh()` exclusively.

#### Caching Convention

| Directive             | Import                   | Purpose                                                                              |
| :-------------------- | :----------------------- | :----------------------------------------------------------------------------------- |
| `"use cache: remote"` | _(directive, no import)_ | Marks an async Server Component or function as cacheable on the remote cache layer   |
| `cacheLife(profile)`  | `next/cache`             | Sets cache duration: `"max"`, `"hours"`, `"minutes"`, `"seconds"`                    |
| `cacheTag(tag)`       | `next/cache`             | Tags the cache entry for targeted invalidation                                       |
| `updateTag(tag)`      | `next/cache`             | Invalidates cache entries matching the tag (called in Server Actions after mutations) |
| `refresh()`           | `next/cache`             | Triggers a re-render of the current page after `updateTag` calls                     |

#### Cache Profiles for Admin Features

| Data                                           | `cacheLife` | `cacheTag`                           | Rationale                                                        |
| :--------------------------------------------- | :---------- | :----------------------------------- | :--------------------------------------------------------------- |
| Analytics summary (KPI cards)                  | `"minutes"` | `"analytics"`, `"analytics-summary"` | Near-real-time but avoids hitting DB on every page load          |
| Role distribution                              | `"minutes"` | `"analytics"`, `"users"`             | Changes only on role updates                                     |
| Downloads by day / device / browser | `"minutes"` | `"analytics"`, `"downloads"`         | Updates on every download, minutes-level freshness is sufficient |
| Popular templates                              | `"minutes"` | `"analytics"`, `"downloads"`         | Same as above                                                    |
| Recent downloads                               | `"minutes"` | `"analytics"`, `"downloads"`         | Same                                                             |
| User list (admin panel)                        | `"minutes"` | `"users"`                            | Changes on role update or new signup                             |
| All templates list (admin panel)               | `"minutes"` | `"templates"`, `"admin-templates"`   | Changes on template CRUD                                         |

#### Cache Invalidation Map

All Server Actions use `const { updateTag, refresh } = await import("next/cache")` then call `updateTag(tag)` for each tag followed by a single `refresh()` call.

| Server Action                     | `updateTag()` calls                               |
| :-------------------------------- | :------------------------------------------------ |
| `updateUserRoleAction`            | `"users"`                                         |
| `logDownloadAction`               | `"downloads"`, `"analytics"`                      |
| `createTemplateAction` (existing) | `"templates"` (already uses `updateTag` pattern)  |
| `editTemplateAction` (existing)   | `"templates"` (already uses `updateTag` pattern)  |
| `deleteTemplateAction` (existing) | `"templates"` (already uses `updateTag` pattern)  |

#### Suspense Strategy

Every admin page wraps each independently-loadable section in its own `<Suspense>` boundary with a `<Skeleton>` fallback. This ensures:

- The page shell renders instantly (sidebar, headers, static layout).
- Each data section streams in as its query resolves.
- No blank screens — skeleton loaders always visible during async states.

```
/admin/analytics/page.tsx (Server Component — page shell)
├── <Suspense fallback={<KPISkeleton />}>
│   └── <AnalyticsSummary />          ← async SC with "use cache: remote"
├── <Suspense fallback={<ChartSkeleton />}>
│   └── <DownloadsByDayChart />       ← async SC with "use cache: remote"
├── <Suspense fallback={<ChartSkeleton />}>
│   └── <DeviceBrowserCharts />       ← async SC with "use cache: remote"
├── <Suspense fallback={<ChartSkeleton />}>
│   └── <LocationChart />             ← async SC with "use cache: remote"
├── <Suspense fallback={<TableSkeleton />}>
│   └── <PopularTemplatesTable />     ← async SC with "use cache: remote"
└── <Suspense fallback={<TableSkeleton />}>
    └── <RecentDownloadsTable />      ← async SC with "use cache: remote"

/admin/users/page.tsx (Server Component — page shell)
└── <Suspense fallback={<DataTableSkeleton />}>
    └── <UsersTable />                ← async SC with "use cache: remote"

/admin/templates/page.tsx (Server Component — page shell)
└── <Suspense fallback={<DataTableSkeleton />}>
    └── <AdminTemplatesTable />       ← async SC with "use cache: remote"
```

#### Example: Analytics Summary Component Pattern

```typescript
import {cacheLife, cacheTag} from "next/cache";
import {getAnalyticsSummary} from "@/lib/queries/analytics";

async function AnalyticsSummary() {
  "use cache: remote";
  cacheLife("minutes");
  cacheTag("analytics");
  cacheTag("analytics-summary");

  const summary = await getAnalyticsSummary();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KPICard title="Total Users" value={summary.totalUsers} />
      <KPICard title="Total Templates" value={summary.totalTemplates} />
      <KPICard title="Total Downloads" value={summary.totalDownloads} />
    </div>
  );
}
```

---

## 6. Server Actions & Queries

### 6.1 Analytics Queries (`src/lib/queries/analytics.ts` — [NEW])

Pure database query functions (no Server Actions). These are called **inside async Server Components** that apply `"use cache: remote"` + `cacheLife` + `cacheTag`. The query functions themselves are plain — caching is handled by the calling component.

| Function                     | Returns                                                             |
| :--------------------------- | :------------------------------------------------------------------ |
| `getAnalyticsSummary()`      | `{ totalUsers, totalTemplates, totalDownloads }`                    |
| `getRoleDistribution()`      | `{ role: string, count: number }[]`                                 |
| `getPopularTemplates(limit)` | Templates sorted by download count with count                       |
| `getRecentDownloads(limit)`  | Last N downloads with template title and user name                  |
| `getDownloadsByDay(days)`    | Downloads per day for the last N days (for Recharts line/bar chart) |
| `getDeviceDistribution()`    | Download counts grouped by device type (desktop/mobile/tablet)      |
| `getBrowserDistribution()`   | Download counts grouped by browser name                             |

### 6.2 Admin Server Actions (`src/app/actions/admin.action.ts` — [MODIFY])

All actions use role-aware middleware from `next-safe-action`. Each action calls `updateTag()` + `refresh()` after successful mutation to invalidate relevant caches.

| Action                    | Middleware               | Logic                                                                                                                                                    | Cache Invalidation (`updateTag` + `refresh`)                |
| :------------------------ | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| `updateUserRoleAction`    | `adminActionClient`      | Validates caller role. Blocks self-demotion. Admin can only toggle `student` ↔ `moderator`. Superadmin can set any role. Uses Better Auth `setRole` API. | `updateTag("users")`                                        |

### 6.3 Download Logging (`src/app/actions/template.ts` — [MODIFY])

New action: `logDownloadAction` — inserts a row into `download_logs` with `templateId`, `userId`, `deviceType`, and `browser`. Device type and browser are parsed server-side from the request `User-Agent` header. After insert, calls `updateTag("downloads")` and `updateTag("analytics")` followed by `refresh()` to invalidate analytics caches.

### 6.4 Template Query Changes (`src/lib/queries/template.ts` — [MODIFY])

- `updateTemplate()`: Accept an optional `bypassOwnerCheck` boolean. When `true`, skip the `eq(templates.createdBy, userId)` condition.
- `deleteTemplate()`: Same `bypassOwnerCheck` parameter.

---

## 7. Frontend Changes

### 7.1 Route Structure

```
/admin                    → Admin overview / redirect to /admin/users
/admin/users              → User directory & role management (Admin + Superadmin)
/admin/templates          → Template moderation (Superadmin only)
/admin/analytics          → Analytics dashboard with Recharts (Superadmin only)
```

Each `/admin` page checks the session role server-side and redirects unauthorized users to `/dashboard`.

### 7.2 Navbar (`src/components/Navbar.tsx` — [MODIFY])

- Check `session.user.role`. If `"admin"` or `"superadmin"`, render a **Shield** icon link to `/admin` in both the desktop dropdown menu and mobile sheet navigation.

### 7.3 Dashboard (`src/app/dashboard/page.tsx` — [MODIFY])

- If `session.user.role === "student"`, **hide** the "Create Template" button.

### 7.4 Template Card (`src/components/ui-custom/TemplateCard.tsx` — [MODIFY])

- Show the edit pencil icon if:
  - `template.createdBy === userId` (current behavior), **OR**
  - `userRole === "superadmin"`

### 7.5 Template Create Page (`src/app/templates/new/page.tsx` — [MODIFY])

- Add a server-side role check. If `session.user.role === "student"`, redirect to `/dashboard`.

### 7.6 Template Edit Page (`src/app/templates/[id]/edit/page.tsx` — [MODIFY])

- Current check: `template.createdBy !== session.user.id` → redirect.
- Updated check: redirect only if `template.createdBy !== session.user.id` **AND** `session.user.role !== "superadmin"`.

### 7.7 PDF Download Button (`src/components/pdf/CoverPageWebPreview.tsx` — [MODIFY])

- On successful download click, fire `logDownloadAction` to record the event.

### 7.8 Admin Panel Pages

#### `/admin/layout.tsx` — [NEW]

- Server component that checks session role. Redirects to `/dashboard` if not admin/superadmin.
- Renders a sidebar with navigation links. Conditionally shows "Analytics" and "Templates" links only for superadmin.

#### `/admin/users/page.tsx` — [NEW]

- Page shell wraps `<UsersTable />` in `<Suspense fallback={<DataTableSkeleton />}>`.
- `UsersTable` is an async Server Component with `"use cache: remote"`, `cacheLife("minutes")`, `cacheTag("users")`.
- Data table with columns: Avatar, Name, Email, Current Role, Joined Date, Actions.
- Search input to filter by name or email.
- "Manage Role" button opens a Dialog with a role selector dropdown.
- Admin view: dropdown shows only `student` and `moderator`.
- Superadmin view: dropdown shows all 4 roles.
- Self-row is visually highlighted and the role selector is disabled (self-demotion blocked).

#### `/admin/templates/page.tsx` — [NEW] (Superadmin only)

- Page shell wraps `<AdminTemplatesTable />` in `<Suspense fallback={<DataTableSkeleton />}>`.
- `AdminTemplatesTable` is an async Server Component with `"use cache: remote"`, `cacheLife("minutes")`, `cacheTag("templates")`, `cacheTag("admin-templates")`.
- Lists all templates with: Course Number, Course Title, Creator Name, Created Date, Actions.
- "Delete" button with a confirmation Dialog.
- "Edit" button links to `/templates/[id]/edit`.

#### `/admin/analytics/page.tsx` — [NEW] (Superadmin only)

Each data section is a **separate async Server Component** with its own `"use cache: remote"` + `cacheLife("minutes")` + relevant `cacheTag`, wrapped in its own `<Suspense>` boundary with a skeleton fallback. This allows each section to stream independently:

- **`<AnalyticsSummary />`** → `<Suspense fallback={<KPISkeleton />}>` — KPI Cards: Total Users, Total Templates, Total Downloads — large numbers with subtle count-up animation. Tags: `"analytics"`, `"analytics-summary"`.
- **`<RoleDistributionChart />`** → `<Suspense fallback={<ChartSkeleton />}>` — Recharts PieChart showing user count per role. Tags: `"analytics"`, `"users"`.
- **`<DownloadsByDayChart />`** → `<Suspense fallback={<ChartSkeleton />}>` — Recharts BarChart showing downloads per day for the last 30 days. Tags: `"analytics"`, `"downloads"`.
- **`<PopularTemplatesTable />`** → `<Suspense fallback={<TableSkeleton />}>` — Table of top 10 templates by download count. Tags: `"analytics"`, `"downloads"`.
- **`<DeviceBrowserCharts />`** → `<Suspense fallback={<ChartSkeleton />}>` — Recharts PieChart showing download distribution by device type and browser. Tags: `"analytics"`, `"downloads"`.

---

## 8. Template Create/Edit/Delete Server Action Guards

Update the existing server actions in `src/app/actions/template.ts`. These actions already use the `updateTag("templates")` + `refresh()` pattern — no cache changes needed, only guard changes.

| Action                 | Current Guard         | New Guard                             | Cache Invalidation (existing) |
| :--------------------- | :-------------------- | :------------------------------------ | :---------------------------- |
| `createTemplateAction` | Authenticated user    | Authenticated + role ≠ `student`      | Already uses `updateTag`      |
| `editTemplateAction`   | Authenticated + owner | Authenticated + (owner OR superadmin) | Already uses `updateTag`      |
| `deleteTemplateAction` | Authenticated + owner | Authenticated + (owner OR superadmin) | Already uses `updateTag`      |

---

## 9. Safe-Action Middleware Enhancement (`src/lib/safe-action.ts` — [MODIFY])

Create new role-aware middleware chains:

```typescript
export const moderatorActionClient = authActionClient.use(
  async ({next, ctx}) => {
    if (ctx.user.role === "student") {
      throw new Error("Insufficient permissions");
    }
    return next({ctx});
  },
);

export const adminActionClient = authActionClient.use(async ({next, ctx}) => {
  if (!["admin", "superadmin"].includes(ctx.user.role)) {
    throw new Error("Insufficient permissions");
  }
  return next({ctx});
});

export const superadminActionClient = authActionClient.use(
  async ({next, ctx}) => {
    if (ctx.user.role !== "superadmin") {
      throw new Error("Insufficient permissions");
    }
    return next({ctx});
  },
);
```

---

## 10. Implementation Steps

1. **Install dependencies:** `recharts`, verify `better-auth` version supports admin plugin.
2. **Create `src/lib/permissions.ts`** with access control definitions.
3. **Update `src/lib/auth.ts`** to register the admin plugin with AC roles.
4. **Update `src/lib/auth-client.ts`** to register `adminClient`.
5. **Update `src/db/schema.ts`** — add `downloadLogs` table.
6. **Run migrations:** `npx drizzle-kit generate` → `npx drizzle-kit push`.
7. **Create `src/lib/validations/admin.ts`** with Zod schemas.
8. **Update `src/lib/safe-action.ts`** — add role-based middleware chains.
9. **Create `src/lib/queries/analytics.ts`** — analytics query functions.
10. **Update `src/lib/queries/template.ts`** — add `bypassOwnerCheck` support.
11. **Update `src/app/actions/template.ts`** — add role guards + `logDownloadAction`.
12. **Update `src/app/actions/admin.action.ts`** — implement admin server actions.
13. **Update UI components** — Navbar, Dashboard, TemplateCard, template create/edit pages.
14. **Build Admin Panel** — layout, users page, templates page, analytics page.
15. **Manually seed first Superadmin** via direct SQL.
16. **Test all role boundaries** end-to-end.

---

## 11. Out of Scope

- Ban/unban user functionality.
- Audit logs for admin actions.
- Guest (unauthenticated) download tracking.
- Renaming `student` role to `general`.
- Organization/team-based access control.

---

<!-- ## 12. First Superadmin Seeding

After deployment, run the following SQL to promote the initial superadmin:

```sql
UPDATE "user" SET role = 'superadmin' WHERE email = '<your-email-here>';
``` -->
