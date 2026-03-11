# EPIC 8 — Multi-template system (HTML templates)

## Epic Goal
Enable multiple modern CV templates (HTML preview) with a clean, scalable template architecture:
- Template registry + selection + persistence
- Implement 3 modern templates as competitors do (two-column, sidebar, timeline)
- Keep templates pure: `CvModel -> JSX`, no side effects

## Definition of Done (applies to all tickets)
- No console errors
- Works on mobile + desktop
- Lint + typecheck + tests pass
- Sections omit cleanly when empty
- Uses shared formatters/utilities (no duplicated date/contact formatting)

---

## TICKET 8.1 — Template system v2: registry + selection + persistence

### Description
As a user, I want to choose between templates so that I can pick the best layout for my CV style.

### Acceptance Criteria
- Introduce `TemplateId` and a template registry (V1 + new templates).
- Selected template is stored in CV state (or a persisted app setting) and survives reload.
- Preview route renders whichever template is selected.
- Editor route includes a simple template selector (dropdown or cards).
- Switching templates does not modify CV data.

### Dev Notes
- Keep templates pure and colocated in a `core/templates` structure.
- Registry should be the only place mapping templateId -> renderer component.
- Keep future PDF parity in mind (registry can optionally include `pdfRenderer?: ...`).

---

## TICKET 8.2 — Template v2: Modern Two-Column (HTML)

### Description
As a user, I want a modern two-column template so my CV looks clean and space-efficient.

### Acceptance Criteria
- Add new HTML template implementing a two-column layout.
- Sidebar contains: contact + skills + languages + certifications (omit empties).
- Main contains: experience + projects + education (omit empties).
- Long content wraps without overflow.
- Print-friendly baseline maintained (no broken print layout).

### Dev Notes
- Reuse shared formatters for dates and contact lines.
- Keep consistent section headings + spacing conventions.

---

## TICKET 8.3 — Template v3: Sidebar + Photo (HTML)

### Description
As a user, I want a sidebar + photo template so my CV looks more modern and visually distinctive.

### Acceptance Criteria
- Add new HTML template with left sidebar and photo placeholder area.
- If photo data is not supported yet, render a tasteful placeholder or omit photo area cleanly.
- Sidebar: photo area + contact + links + skills (omit empties).
- Main: experience + education + projects (omit empties).
- No layout breakage with missing optional fields.

### Dev Notes
- Do NOT implement file upload yet; just design for future.
- Ensure it still looks professional when photo is absent.

---

## TICKET 8.4 — Template v4: Timeline Experience (HTML)

### Description
As a user, I want a timeline-style experience layout so my work history is easier to scan.

### Acceptance Criteria
- Add new HTML template rendering experience entries in a timeline layout.
- Dates are formatted via shared formatters.
- Works with many experiences and long bullet highlights.
- Other sections render consistently and are omitted if empty.

### Dev Notes
- Keep timeline styling minimal (lines/dots) but stable across screen sizes.

---

# Claude-ready prompts

## Prompt — Ticket 8.1
```text
Implement Jira Ticket 8.1 — Template system v2: registry + selection + persistence.

Context:
- App already has CvModel + persistence + provider + Preview Template v1.
- Do NOT break existing Editor/Preview behavior.
- Keep architecture boundaries: core/ must not import from features/.

Goal:
Introduce a scalable template system:
- Template registry with TemplateId
- Persisted template selection
- Preview renders selected template
- Editor includes template selector UI

Requirements:
1) Define TemplateId type and a template registry in core/templates:
   - Must include existing Template v1 plus placeholders for new templates (8.2–8.4).
   - Each template entry provides:
     - id, name/label
     - HtmlRenderer component (pure)
     - (Optional placeholder) PdfRenderer reference (for future)
2) Store selected TemplateId:
   - Preferred: store in CvModel (e.g., cv.settings.templateId) so it persists with existing storage.
   - Alternative: store in persisted app settings, but must persist across reloads.
   - Choose ONE approach and apply consistently.
3) Wire Preview:
   - PreviewPage reads selected templateId and renders the correct HtmlRenderer with cv.
4) Add selector UI:
   - Add a simple selector (dropdown or cards) in EditorPage (or a settings area).
   - Selecting a template updates state and Preview reflects it.
5) Ensure no CV data is changed when switching templates.

Testing:
- Add a smoke test that verifies switching template changes which renderer is used (can assert template label/heading unique text).
- Ensure lint/typecheck/tests pass.

Output:
- List changed files + quick manual verify steps.


Implement Jira Ticket 8.2 — Template v2: Modern Two-Column (HTML).

Goal:
Create a new modern two-column HTML template and register it in the template registry.

Requirements:
1) Add a new template renderer component in core/templates/<template>/html.
2) Two-column layout:
   - Sidebar: contact, links (if present), skills, languages, certifications.
   - Main: experience, projects, education.
3) Omit empty sections entirely.
4) Use shared formatters for:
   - contact line
   - date ranges
5) Ensure long content wraps cleanly (no overflow).
6) Add minimal test: render template with sample CvModel and assert key headings appear.

Output:
- List changed files + verification steps (switch template + view /preview).

Implement Jira Ticket 8.3 — Template v3: Sidebar + Photo (HTML).

Goal:
Create a sidebar + photo style template and register it.

Requirements:
1) Add new template renderer in core/templates.
2) Sidebar includes a photo area:
   - If photo is not supported in CvModel yet, render either:
     - a subtle placeholder block, or
     - omit photo area completely
   - Must not look broken in either case.
3) Sidebar: contact + links + skills
4) Main: experience + education + projects
5) Omit empty sections
6) Use shared formatters for dates/contact

Tests:
- Smoke render test for template.

Output:
- Changed files + how to verify manually.


Implement Jira Ticket 8.4 — Template v4: Timeline Experience (HTML).

Goal:
Create a timeline experience layout template and register it.

Requirements:
1) Timeline for experience entries (left rail with dots or subtle markers).
2) Dates and role/company aligned cleanly; bullet highlights render below.
3) Responsive: timeline does not break on mobile.
4) Omit empty sections; use shared formatters.

Tests:
- Smoke test verifies experience entries render and timeline container exists.

Output:
- Changed files + manual verification steps.