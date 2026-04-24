# Product Requirements Document (PRD)

**Project Name:** CoverIt  
**Tech Stack:** Next.js 16 (App Router), TypeScript, Drizzle ORM, Tailwind CSS, shadcn/ui  
**Version:** 1.0.0  

---

## 1. Executive Summary

### 1.1 Problem Statement
University students frequently need to create standardized Top Pages (top sheets) for lab reports. The current process involves finding a Microsoft Word template, manually editing recurring personal details (Name, ID, Section) and course-specific details (Course Name), which is tedious, repetitive, and error-prone.

### 1.2 Solution
A web application where students register once, save their permanent academic details, and generate a customized, correctly-formatted PDF Top Page with a single click by selecting a pre-configured course template created by other students.

---

## 2. Target Audience & Usage
*   **Students:** The sole users of the application. They will both create the course templates and generate their own Top Pages quickly.
*   **Estimated User Base:** ~5,000 total users.
*   **Device Usage:** The application will predominantly be used on mobile devices (smartphones) for quick on-the-go generation, with secondary usage on laptops/desktops.

---

## 3. Core Features & User Stories

### 3.1 Authentication & User Profiles
*   **User Story:** As a student, I want to create an account so my personal details are saved for future use.
*   **User Story:** As a student, I want to input my academic profile (Name, Student ID, Department, Section, Subsection, Group No, Level, Term) so I never have to type it again for a top sheet.
*   **Requirements:**
    *   Secure login/registration (email/password or OAuth via better-auth or custom implementation).
    *   A profile completion form mandatory before generating pages.

### 3.2 Template Management
*   **User Story:** As a student, I want to create a reusable template for a specific lab course so my classmates and I can use it.
*   **Requirements:**
    *   Form to input course details: Course Number (e.g., CE 332), Course Title, Term (e.g., January 2025).
    *   Input fields for exactly two Course Teachers (Teacher 1 Name/Designation, Teacher 2 Name/Designation).
    *   Metadata tagging: Department, Level, Term, Section, Subsection (to ensure templates are shown only to relevant students).

### 3.3 Dashboard & Discovery
*   **User Story:** As a student, I want to see a list of templates relevant to my specific class/section automatically.
*   **Requirements:**
    *   A dashboard displaying available templates filtered by the user's saved Department, Level, Section, and Subsection.
    *   Search functionality and filtering (by course code/name).

### 3.4 Preview & Generation
*   **User Story:** As a student, I want to preview my customized top sheet before downloading to ensure accuracy.
*   **User Story:** As a student, I want to download the final top sheet as a PDF with one click.
*   **Requirements:**
    *   A web-based A4 preview combining the selected template data + the logged-in user's profile data.
    *   The design must strictly follow the standard university format (centered logo, specific typography, aligned student blocks).
    *   A "Download PDF" button that generates a high-quality, print-ready A4 PDF.

---

## 4. Technical Specifications

### 4.1 Data Architecture (Drizzle Schema Overview)
*   **`users`**: `id`, `name`, `email`, `student_id`, `department`, `section`, `subsection`, `group_no`, `level`, `term`.
*   **`templates`**: `id`, `course_number`, `course_title`, `session_term`, `department_target`, `level_target`, `term_target`, `section_target`, `subsection_target`, `created_by`, `teacher_1_name`, `teacher_1_designation`, `teacher_2_name`, `teacher_2_designation`.

### 4.2 UI/UX Guidelines
*   **Design System:** shadcn/ui components with Tailwind CSS for consistent spacing, typography, and styling.
*   **Responsiveness:** Mobile-first design for the dashboard and forms (students often use phones for quick tasks). The preview pane should scale proportionally on smaller screens while maintaining the A4 aspect ratio.
*   **Preview UI:** HTML/Tailwind implementation of the target PDF to provide a visually accurate WYSIWYG experience.

### 4.3 PDF Generation Strategy
*   Utilize a client-side library to maintain server performance and reduce hosting costs.
*   *Primary Option:* Use browser's native print-to-pdf via `@react-pdf/renderer` for robust, text-selectable, vector PDFs.
*   *Fallback Option:* `html2canvas` + `jspdf` (DOM to Canvas to PDF) for exact CSS replication of the web preview.

---

## 5. Non-Functional Requirements
*   **Performance & Scale:** Fast load times utilizing Next.js Server Components. Utilize Suspense and optimized caching. The app must reliably handle periodic spikes in traffic (e.g., end of semester / lab submission days) for an estimated 5k user base. 
*   **Security:** Users can only modify their own profile. Only authenticated users can view/create templates. Implement Row Level Security (RLS) or application-level authorization.
*   **Reliability:** Try/catch blocks and React error boundaries for form submissions and PDF generation failures. Ensure the PDF generation library functions flawlessly across mobile browsers (Safari on iOS, Chrome on Android).

---

## 6. Future Scope (V2)
*   **Full Lab Report Generation:** Expand beyond just the Top Sheet. When a user clicks download for a course, the system will generate a combined, multi-page PDF containing the Top Sheet, Cover Page, and Index Page.
*   Support for multiple university template styles (e.g., dynamic layouts based on university selection).
*   Dynamic university logo fetching based on the user's selected institution.
*   Shareable public links for templates with QR code generation.
