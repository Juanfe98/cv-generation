============================================================
- Re Investment and validation on `Edit` & `Preview` section
- Data Normalization in the model/schema and template
- Getting everything ready for the export pdf tool be smoother.
============================================================
---

You are going to IMPLEMENT the work described below (not “create a ticket”). Treat each item as a task spec. Follow existing repo patterns, UI style, and the current “explicit Save button” section workflow.

Global constraints (apply to all tasks):
- Do NOT redesign the UI. Keep Tailwind styling consistent with current sections/template.
- Do NOT change routing, CI, package manager, or overall architecture boundaries.
- Keep “core/” independent (must not import from features/).
- Keep section pattern consistent: RHF local edits → Save writes to CvModel via useCv/updateCv → persistence handled centrally.
- Keep changes small, clean, and covered by tests where required.
- Ensure lint/typecheck/tests pass at the end of each task.

============================================================
TASK 6.1 — Editor consistency pass (Save/dirty/reset behavior)
============================================================

Goal:
Make all editor sections behave consistently and predictably.

Requirements:
1) Save enable/disable behavior:
   - Standardize Save button behavior across ALL sections:
     - Save disabled when not dirty.
     - Save enabled when dirty AND form is valid (or if you already use “validate on submit”, then enable when dirty and show errors only after submit; keep it consistent across sections).
   - Ensure this rule is applied everywhere (Profile, Experience, Education, Skills, Projects, Certifications, Languages).

2) After Save:
   - Ensure that after a successful Save, the form’s dirty state resets consistently (use RHF reset with current saved values).
   - Ensure the UI doesn’t still show “unsaved changes” state after Save.

3) Validation error display:
   - Standardize when errors show:
     - Prefer “show errors after submit” OR “after touch/blur”, but pick ONE and apply everywhere.
   - No noisy errors on initial render.

4) Cancel/reset behavior (if present):
   - If sections already have Cancel/Reset, ensure it resets the form to current CvModel values (discard local draft).
   - If sections do NOT have Cancel/Reset today, do NOT add it unless it’s trivially small and consistent with current UI.

5) Visual/UX consistency:
   - Section headers, actions placement, spacing, buttons should remain consistent via the shared editor toolkit.
   - No visual regressions.

Acceptance criteria:
- All sections follow the same Save/dirty/validation behavior.
- Save never writes partial invalid data.
- After Save, dirty is false everywhere.
- lint/typecheck/tests pass.

Output:
- List changed files.
- Briefly describe the standardized Save + validation rule chosen.

============================================================
TASK 6.2 — Data normalization + guardrails
============================================================

Goal:
Ensure stored CvModel data is normalized and safe so preview/export never breaks.

Requirements:
1) String trimming:
   - When saving arrays of strings (skills, highlights, etc.), trim whitespace and drop empty entries.
   - Ensure single-line inputs (name, headline, location, etc.) are trimmed on Save.

2) Duplicate handling:
   - Skills: prevent duplicates case-insensitively (e.g., “React” == “react”).
   - If your links list exists: prevent exact duplicates (or case-insensitive if you prefer; pick one).

3) isCurrent rules:
   - If an experience item has isCurrent = true:
     - endDate must be cleared/ignored on Save.
   - Preview must render date range correctly for current roles.

4) Safe rendering:
   - Preview must never render “undefined”, “null”, or stray separators (like “• •”).
   - Contact line should omit missing fields cleanly.

5) Centralize normalization:
   - Prefer implementing normalization in ONE place:
     - either in core/cv parse/normalize helpers
     - or in core/formatters/helpers used by Editor on Save
   - Do not duplicate normalization logic across every section.

Tests:
- Add/extend unit tests covering:
  - trimming + dropping empties
  - skills duplicate prevention
  - isCurrent clearing endDate
  - contact line formatting doesn’t produce empty separators

Acceptance criteria:
- User-entered strings are normalized.
- Duplicate skills prevented.
- Current roles never keep endDate.
- Preview output is clean with missing values.
- lint/typecheck/tests pass.

Output:
- List changed files.
- Show a few examples of before/after normalization behavior.

============================================================
TASK 6.3 — Preview template print-ready polish
============================================================

Goal:
Improve Template v1 HTML preview so it looks professional with long content and is ready for exporting.

Requirements:
1) Long content handling:
   - Long headings, long company names, long bullets must wrap cleanly.
   - No overflow or layout breakage.

2) Consistent spacing/typography:
   - Standardize section spacing, heading sizes, bullet indentation consistently across all sections.
   - Ensure consistent item spacing within lists (Experience/Projects/etc.).

3) Empty section omission:
   - Verify every section is omitted when empty (no blank headings).

4) Avoid ugly breaks:
   - Reduce cases where a section heading appears at the bottom with no content under it.
   - If you already have CSS utilities for this, reuse them; otherwise implement a minimal approach (don’t overengineer).

5) Print-friendly baseline:
   - Add minimal print CSS (if applicable in your current approach) so the preview prints reasonably:
     - sensible margins
     - avoid cutting off content
   - Keep it minimal and non-breaking.

Tests:
- Update/extend preview smoke tests or snapshots:
  - A case with long bullets renders without overflow.
  - Empty sections omitted.

Acceptance criteria:
- Template v1 looks good with long content.
- No overflow issues.
- Empty sections omitted everywhere.
- lint/typecheck/tests pass.

Output:
- List changed files.
- Brief explanation of the print-ready adjustments.

============================================================
TASK 6.4 — Regression test suite (unit + e2e smoke)
============================================================

Goal:
Add automated regression coverage for the core user flow: edit -> save -> preview -> persist.

Requirements:
1) Unit tests:
   - Ensure there is unit coverage for:
     - core formatters (dates/contact line)
     - reorder helper (moveItem)
     - key normalization rules added in Task 6.2
   - Keep tests fast and deterministic.

2) E2E smoke tests (Playwright preferred if not already present):
   - Test flow:
     - Go to /editor
     - Fill minimal Profile (name) and Save
     - Add one Experience entry and Save
     - Add at least one more section (e.g., Skills or Education) and Save
     - Navigate to /preview and assert rendered content exists (headings + key text)
   - Persistence smoke:
     - Reload the page (or restart context) and confirm data is still present.

3) CI integration:
   - Ensure tests run in CI.
   - If e2e is heavy, you can add it as a separate job or mark as smoke-only; keep it lean.

Acceptance criteria:
- Unit tests cover core helpers and normalization.
- E2E smoke covers edit/save/preview/persist flow.
- Tests run reliably in CI.
- lint/typecheck/tests pass.

Output:
- List added tests and where they live.
- Short instructions to run unit tests and e2e locally.

---

============================================================
TASK 7.1 — PDF Export MVP (Template v1 → PDF) using @react-pdf/renderer
============================================================

Goal:
Generate a PDF that matches Template v1 content (content parity, not pixel-perfect), using @react-pdf/renderer.

Implementation requirements:
1) Dependencies:
- Add @react-pdf/renderer (and any required peer deps) to the repo.
- Keep changes minimal; do not introduce unrelated libs.

2) PDF Template component:
- Create a PDF renderer for Template v1 under a clean location, e.g.:
  - src/core/templates/templateV1/pdf/TemplateV1Pdf.tsx
- This component must be PURE: input is (cv, formatters), output is a @react-pdf/renderer <Document> tree.
- Use @react-pdf/renderer primitives ONLY (Document, Page, View, Text, Link).
- Mirror the section order and omission rules from HTML template:
  - Render sections only if data exists.
  - Sections: Experience, Education, Projects, Skills, Certifications, Languages (plus Profile header + contact line).
- Bullet lists:
  - Render highlights as bullets.
  - Handle long bullet text by wrapping (no overflow).
- Dates/contact:
  - Use existing formatter functions from core/formatters to keep parity.

3) PDF Exporter API (core):
- Add a PDF exporter function in core/exporters:
  - exportPdf(cv: CvModel, templateId: TemplateId): Promise<Blob>
- Implementation:
  - Select the correct PDF template by templateId (for now only Template v1).
  - Use @react-pdf/renderer’s pdf() API to render to Blob.
  - Must never throw raw errors to UI: throw a normalized Error with a user-friendly message or return a Result type (choose one and keep consistent).

4) File naming:
- Provide a helper:
  - buildExportFileName(cv, ext) -> `${sanitizedName || "cv"}-${YYYYMMDD}.${ext}`
  - sanitize name (no slashes/illegal chars; trim).
- Use the same naming convention for future DOCX.

5) Long-content safety:
- Ensure sections wrap and do not crash on:
  - many experiences
  - long company names
  - long highlights
- If page breaks happen naturally, that’s fine.

Tests:
- Add unit test(s) that:
  - call exportPdf with a minimal CvModel and assert it returns a Blob of type application/pdf and size > 0.
  - (If testing actual PDF bytes is hard, just assert Blob exists and no throw.)
- Keep tests stable and not snapshot-heavy.

Acceptance criteria:
- exportPdf produces a downloadable PDF blob.
- Includes all populated sections with omission rules.
- Uses core formatters for dates/contact line.
- Works with long content (no crash).
- lint/typecheck/tests pass.

Output:
- List changed/added files.
- Short note on how to manually verify PDF output.

============================================================
TASK 7.2 — DOCX Export Spike (Template v1 → DOCX)
============================================================

Goal:
Generate a DOCX file with Template v1 content (content parity) using the “docx” library.

Implementation requirements:
1) Add dependency:
- Add “docx” library (no HTML-to-docx converters).

2) DOCX generator:
- Create a generator under:
  - src/core/templates/templateV1/docx/TemplateV1Docx.ts (or similar)
- Input: CvModel
- Output: docx.Document instance
- Formatting:
  - Headings for sections
  - Paragraphs for roles/companies/dates
  - Bullet lists for highlights
  - Links: include as text; if easy, make clickable hyperlinks; otherwise plain text is ok for MVP.

3) DOCX Exporter API (core):
- exportDocx(cv: CvModel, templateId: TemplateId): Promise<Blob>
- Use Packer.toBlob(document).

4) File naming:
- Reuse buildExportFileName(cv, "docx")

5) Tests:
- Minimal unit test: exportDocx returns Blob with size > 0.

Acceptance criteria:
- DOCX includes all populated sections with omission rules.
- Headings and bullets preserved.
- Uses same date/contact formatting utilities as preview/PDF.
- Works with long content (no crash).
- lint/typecheck/tests pass.

Output:
- List changed/added files.
- Manual verification steps (open DOCX in Word/Google Docs).

============================================================
TASK 7.3 — Export UI (Preview page) + loading/error states
============================================================

Goal:
Provide a clean export UX from the Preview page for PDF and DOCX.

Implementation requirements:
1) UI placement:
- Add an “Export” area on /preview (preferred).
- Provide two buttons:
  - “Export PDF”
  - “Export DOCX”
- Use existing button components/styles if you have them; otherwise keep Tailwind consistent.

2) Behavior:
- On click:
  - Disable buttons while generating
  - Show a small loading state (spinner/text)
  - Call exportPdf/exportDocx with current cv and current templateId
  - Trigger download in browser:
    - createObjectURL(blob) + anchor click + revokeObjectURL
- Prevent double-click multiple downloads (disable during loading).

3) Errors:
- Catch errors and show a user-friendly message in the UI (no stack traces).
- Ensure the app does not crash if export fails.

4) Tests:
- Add a UI test (unit/integration) that:
  - renders Preview page
  - mocks exportPdf/exportDocx
  - clicking button shows loading and then completes
- Keep test simple.

Acceptance criteria:
- Export buttons exist and work.
- Loading and error states are user-friendly.
- No duplicate downloads on double click.
- Works on mobile + desktop.
- lint/typecheck/tests pass.

Output:
- List changed files.
- Brief manual verification steps.