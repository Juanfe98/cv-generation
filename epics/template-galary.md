
---

```md
# EPIC 10 — Template gallery + light customization

## Epic Goal
Improve template discovery and differentiation:
- Template gallery/picker (visual selection)
- Minimal theme options (accent colors / spacing presets) that apply per template

## Definition of Done (applies to all tickets)
- Works on mobile + desktop
- Selections persist
- Preview updates immediately
- Lint + typecheck + tests pass

---

## TICKET 10.1 — Template gallery (picker screen)

### Description
As a user, I want to see template previews so I can pick a design confidently.

### Acceptance Criteria
- Add a template gallery UI (route or modal) listing templates from registry.
- Each template card shows name + short label (e.g., “Modern”, “Sidebar”, “Timeline”).
- Selecting a template updates selection and returns to preview/editor (or closes modal).
- Works on mobile.

### Dev Notes
- Thumbnails can be static placeholders (no need for real rendered thumbnails yet).
- Keep gallery driven by the template registry (single source of truth).

---

## TICKET 10.2 — Template labels + metadata (for gallery + filtering)

### Description
As a user, I want template categories so I can choose based on my needs.

### Acceptance Criteria
- Add metadata to template registry:
  - category (Modern/ATS/Creative/etc.)
  - layout type (One column / Two column / Sidebar)
- Gallery displays these labels.
- No change in rendering logic.

---

## TICKET 10.3 — Minimal theme customization (accent color + spacing preset)

### Description
As a user, I want small customization options so my CV matches my style.

### Acceptance Criteria
- Add 2–4 accent color options and 2–3 spacing presets (S/M/L).
- Selection persists (stored alongside template selection).
- Preview updates immediately.
- Theme applies across templates that support it (start with Template v1 + Modern Two-Column).

### Dev Notes
- Keep theme tokens centralized (core/theme).
- Avoid per-template ad-hoc styling; use token variables / props.

---

# Claude-ready prompts

## Prompt — Ticket 10.1
```text
Implement Jira Ticket 10.1 — Template gallery (picker screen).

Context:
- Template registry exists (8.1) and selection persists.
- Preview renders selected template.

Goal:
Add a template gallery UI for selecting templates.

Requirements:
1) Add UI entry point:
   - Either new route `/templates` OR a modal accessible from Editor/Preview.
   - Choose simplest consistent with current router/layout.
2) Render a grid/list of templates from the registry.
3) Each card shows:
   - template name/label
   - short metadata tags (if available)
   - simple placeholder thumbnail block (static)
4) Clicking a card sets selected template and navigates back/close.
5) Works on mobile and desktop.

Tests:
- Smoke test: gallery renders templates from registry and selection changes.

Output:
- Changed files + manual verify steps.

Implement Jira Ticket 10.3 — Minimal theme customization (accent color + spacing presets).

Goal:
Add small theme options that persist and update Preview.

Requirements:
1) Define theme tokens in core/theme:
   - accentColor options (2–4)
   - spacing preset options (S/M/L)
2) Persist selection alongside template selection (same persistence strategy).
3) Update templates to consume theme tokens:
   - Template v1 and Modern Two-Column first.
   - Apply accentColor to headings/dividers/links.
   - Apply spacing preset to section gaps/item gaps.
4) Add simple UI controls (dropdown or buttons) in Editor or Preview.
5) Tests:
   - selection persists across reload (unit or integration)
   - preview re-renders with theme change (smoke)

Output:
- Changed files + manual verification steps.