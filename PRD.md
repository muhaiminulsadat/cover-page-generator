# Product Requirements Document (PRD)

Project Name: CoverIt  
Version: 1.1.0 (Current Implementation Baseline)  
Last Updated: 2026-04-26  
Stack: Next.js 16 App Router, TypeScript, Drizzle ORM, better-auth, Tailwind CSS v4, shadcn/ui, @react-pdf/renderer

---

## 1. Product Overview

### 1.1 Problem
Students repeatedly prepare lab submission pages with the same profile and course metadata, causing slow manual edits and format inconsistency.

### 1.2 Current Solution
CoverIt lets students:
- register and log in,
- complete academic profile once,
- discover templates filtered to their metadata,
- preview and download a generated multi-page PDF.

Current generated output is a combined document containing:
- top sheet,
- cover page,
- index page.

---

## 2. Target Users

- Primary users: undergraduate engineering students creating lab submission pages.
- Primary usage pattern: mobile-first quick generation, with desktop for preview and download.
- Collaboration model: students create reusable templates for classmates.

---

## 3. Functional Scope (As Implemented)

### 3.1 Authentication and Session

Implemented:
- Email/password registration and login via better-auth.
- Session-based access control in protected routes.
- Sign-out from navbar menu.

Current behavior notes:
- Login UI includes a Google sign-in action in the client.
- Backend auth config currently enables email/password only; social provider wiring is not yet configured.

### 3.2 Profile Completion and Settings

Implemented:
- Mandatory onboarding for profile completion before template workflows.
- Editable profile settings page for academic metadata.
- Validation with zod + react-hook-form.

Profile fields currently used in app and schema:
- name
- studentId
- university
- department
- section
- subsection
- groupNo
- level
- term
- hscBatch

### 3.3 Template Lifecycle

Implemented:
- Create template.
- Edit template (owner-only).
- Preview template.
- Template metadata targeting for discoverability.

Template input currently supports:
- top sheet designId
- cover page coverDesignId
- courseNumber
- courseTitle
- sessionTerm
- optional targeting metadata: department, level, term, section, subsection, hscBatch
- teacher1 required (name + designation)
- teacher2 optional (name + designation)

### 3.4 Discovery and Dashboard

Implemented:
- Home route serves as authenticated dashboard.
- Templates are filtered by user metadata with nullable/empty metadata fallback support.
- Unauthenticated users see a landing page.

Not yet implemented:
- text search by course code/title in UI.
- explicit filter controls in UI.

### 3.5 PDF Preview and Download

Implemented:
- In-browser preview using PDFViewer.
- Download via PDFDownloadLink.
- Multi-page PDF composition from a single template/user context.

Current design support:
- Top sheet designs: classic-v1, buet-submitted-v1.
- Cover page designs: cover-classic-v1.
- Index page designs: index-classic-v1 (default single renderer).

---

## 4. Core User Flows

### 4.1 New User
1. User signs up.
2. User is directed into onboarding.
3. User submits profile details.
4. User reaches dashboard and sees relevant templates.

### 4.2 Returning User
1. User logs in.
2. Dashboard shows templates filtered by profile metadata.
3. User opens template preview.
4. User downloads generated PDF.

### 4.3 Template Author
1. Authenticated user opens create template page.
2. User selects designs and fills course + teacher + targeting fields.
3. Template is created and redirected to preview page.
4. Author can edit template from preview page.

---

## 5. Data Model (Current)

### 5.1 Auth and User Tables

Implemented tables:
- user
- session
- account
- verification

Relevant user columns:
- id, email, name, role, emailVerified, image
- studentId, university, department, section, subsection, groupNo, level, term, hscBatch
- createdAt, updatedAt

### 5.2 Template Table

Current columns:
- id
- designId
- coverDesignId
- courseNumber
- courseTitle
- sessionTerm
- departmentTarget
- levelTarget
- termTarget
- hscBatchTarget
- sectionTarget
- subsectionTarget
- createdBy
- teacher1Name, teacher1Designation
- teacher2Name, teacher2Designation
- createdAt, updatedAt

Migration history includes added fields for experiment_name and index_rows, but they are not currently represented in runtime schema usage.

---

## 6. Architecture and Implementation Notes

- Rendering model: Next.js App Router with Server Components as default.
- Protected mutations: next-safe-action with session-aware auth middleware.
- Route protection:
  - middleware/proxy guards onboarding and templates routes.
  - server checks also enforce auth/ownership where needed.
- Data access: Drizzle ORM query helpers for metadata filtering and template CRUD.
- PDF engine: @react-pdf/renderer with design registries and context-based renderers.

---

## 7. Non-Functional Requirements (Current)

### 7.1 Performance
- Suspense boundaries on major routes.
- Server-side data loading for dashboard and protected pages.
- Lightweight client mutations via safe actions.

### 7.2 Security and Access Control
- Authenticated-only template create/edit/preview flows.
- Owner-only template editing enforced server-side.
- Authenticated profile update actions scoped to current user.

### 7.3 Reliability
- Validation at form and server-action layers.
- Error messaging through toast/UI states in forms.
- Basic loading/skeleton states across auth/dashboard/settings/template pages.

---

## 8. Gaps and Active Backlog

### 8.1 High Priority
- Configure and verify Google OAuth provider end-to-end if social login is required.
- Add dashboard search/filter UI to match expected discovery requirements.
- Align login post-auth redirect path with existing routes.

### 8.2 Medium Priority
- Wire experiment_name and index_rows through schema, forms, queries, and index-page renderer.
- Add richer template moderation/admin flows (admin action file is currently empty).

### 8.3 Low Priority
- Additional cover page and index page design variants.
- Public sharing for templates.
- University-specific logo and style packs.

---

## 9. V2 Direction

- Full report composition enhancements beyond current 3-page output.
- Advanced filtering and discoverability.
- Improved mobile PDF preview fallback for browsers with embedded viewer limitations.
- Collaboration and sharing capabilities for templates.
