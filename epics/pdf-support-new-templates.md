
---

```md
# EPIC 9 — PDF parity for templates (react-pdf/renderer)

## Epic Goal
Extend PDF export so it respects the selected template, starting with Template v1 + Modern Two-Column.

## Definition of Done (applies to all tickets)
- PDF export works from `/preview` (or designated export UI)
- Uses selected TemplateId
- No crashes with long content
- Lint + typecheck + tests pass

---

## TICKET 9.1 — PDF Template registry wiring (TemplateId -> PdfRenderer)

### Description
As a user, I want PDF export to match my selected template so downloads preserve the design.

### Acceptance Criteria
- Template registry includes `pdfRenderer` for templates that support PDF.
- PDF exporter selects PdfRenderer based on selected TemplateId.
- If a template lacks PdfRenderer, exporter falls back to Template v1 PDF (or blocks with a friendly message—choose one and document).

### Dev Notes
- Keep `core/exporters/exportPdf` template-selection logic centralized.
- Keep `core/` boundaries clean.

---

## TICKET 9.2 — PDF renderer for Modern Two-Column template

### Description
As a user, I want the Modern Two-Column template exported to PDF.

### Acceptance Criteria
- Implement PDF renderer using `@react-pdf/renderer` primitives only.
- Structure matches HTML template sections and omission rules.
- Long content wraps and paginates naturally.

### Dev Notes
- Reuse the same formatters used by HTML (dates/contact).
- Keep visual parity by matching hierarchy, not pixel perfection.

---

## TICKET 9.3 — PDF regression tests for multi-template export

### Description
As a developer, I want automated coverage so template PDF exports don’t regress.

### Acceptance Criteria
- Unit tests validate `exportPdf` returns a non-empty PDF Blob for:
  - Template v1
  - Modern Two-Column (once implemented)
- Tests are deterministic and not brittle.

---

# Claude-ready prompts

## Prompt — Ticket 9.1
```text
Implement Jira Ticket 9.1 — PDF Template registry wiring (TemplateId -> PdfRenderer).

Context:
- exportPdf already exists using @react-pdf/renderer.
- Template registry exists (8.1) for HTML templates.

Goal:
Make PDF export respect the selected TemplateId via a PdfRenderer mapping in the template registry.

Requirements:
1) Extend template registry entries to optionally include `PdfRenderer`.
2) Update exportPdf to:
   - read selected templateId (same place as HTML preview)
   - choose PdfRenderer for that templateId when available
   - define a clear fallback behavior if missing (fallback to v1 PDF OR show friendly error).
3) Keep architecture: core/exporters should not import from features/.
4) Add/adjust unit tests for exportPdf to validate:
   - returns a PDF Blob
   - does not throw for missing PdfRenderer (per chosen fallback)

Output:
- Changed files + how to verify manually.

Implement Jira Ticket 9.2 — PDF renderer for Modern Two-Column template.

Goal:
Add a @react-pdf/renderer Document/Page renderer for the Modern Two-Column template.

Requirements:
1) Implement PdfRenderer component for Modern Two-Column:
   - Use Document/Page/View/Text/Link only.
   - Two-column layout with sidebar/main (flex layout).
2) Render the same sections and omission rules as HTML:
   - Sidebar: contact, links, skills, languages, certifications
   - Main: experience, projects, education
3) Use shared formatters for dates/contact lines.
4) Ensure long content wraps and paginates without crashing.
5) Register this PdfRenderer in the template registry.
6) Add unit test: exportPdf with this templateId returns non-empty PDF Blob.

Output:
- Changed files + manual verification steps.

Implement Jira Ticket 9.3 — PDF regression tests for multi-template export.

Goal:
Strengthen automated coverage for PDF export across templates.

Requirements:
1) Add tests that call exportPdf for:
   - Template v1
   - Modern Two-Column (if implemented)
2) Assert:
   - Blob exists, size > 0, type is application/pdf (when available)
3) Keep tests stable and fast.

Output:
- Test files added/changed + how to run tests.