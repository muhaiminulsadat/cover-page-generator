# Design Specifications: Admin Panel UI Polish

Design specifications for the Admin Panel rewrite, integrating Emil Kowalski's polish concepts and Next.js 16 skeletal layout principles.

## Core Visual System

### Palette & Accents
- **Base theme:** Clean, HSL/oklch based color values. Keep consistent with current light/dark parameters.
- **Borders:** Soft, subtle borders (`oklch(0.92 0.004 286.32)` light / `oklch(1 0 0 / 10%)` dark) to create visual separation without clutter.
- **Glassmorphism:** Use `backdrop-blur-md` on hover overlays and dropdowns.

### Typography & Hierarchy
- **Primary Titles:** Outfit (`font-heading`) for titles, tracking-tight.
- **Data & Tables:** Inter/Geist-sans for high readability. Secondary text using `text-xs text-muted-foreground`.
- **Card Titles:** Small uppercase labels for sub-headings to create semantic sections.

## Micro-Interactions & Transitions

### Buttons & Inputs
- **Active State:** All pressable controls (pagination buttons, role selectors, table actions) must trigger `active:scale-[0.97]` or similar subtle shrink to indicate tactile click feedback.
- **Transition Curve:** Custom timing function `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` at 160ms-200ms. No native `transition-all`. Specify `transition: transform, background-color, border-color`.
- **Input Focus:** Focus states should smoothly scale active outlines, transitioning smoothly using custom ease curves.

### Modals & Dropdowns
- **Entry style:** Animate entry using `opacity` + subtle scale (`scale(0.95)` to `scale(1)`). Never start from `scale(0)`.
- **Exit style:** Fast dismiss (125-150ms).
- **Origin awareness:** Trigger dropdown content to scale from trigger bounds using proper Radix `transform-origin` utilities.

## Skeletal Loading Layouts

To facilitate Next.js 16 instant navigation, all data-heavy widgets must load asynchronously using Suspense boundaries. The layout shell is immediately server-rendered while skeleton components pulse in-place.

```
+-------------------------------------------------------------+
|  [Sidebar Nav]  |  [Header & Section Title]                 |
|  - Overview     |  [Search Input Skeleton]                  |
|  - Users        |                                           |
|  - Templates    |  +-------------------------------------+  |
|  - Analytics    |  | [Table Header]                      |  |
|                 |  +-------------------------------------+  |
|                 |  | [User Row Skeleton: Avatar + Text]  |  |
|                 |  | [User Row Skeleton: Avatar + Text]  |  |
|                 |  | [User Row Skeleton: Avatar + Text]  |  |
|                 |  +-------------------------------------+  |
+-------------------------------------------------------------+
```

### Skeletal Component Rules
1. **Match layout perfectly:** A skeleton table row must mirror the height, borders, margins, cell structure, and avatar dimensions of the loaded table row.
2. **Animation:** Soft `animate-pulse` opacity changes (not too fast/flashy).
3. **Rounded edges:** All skeleton nodes must match target element radii (e.g. `rounded-full` for avatars, `rounded-md` for badges).
