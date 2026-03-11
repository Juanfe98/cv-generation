import { pdf } from '@react-pdf/renderer'
import type { CvModel } from '../cv/types'
import type { PdfTemplateId, TemplateFormatters } from '../templates'
import { TemplateV1Pdf } from '../templates/templateV1/pdf/TemplateV1Pdf'
import {
  formatDate,
  formatDateRange,
  formatEducationDateRange,
  formatContactLine,
  formatDegreeField,
} from '../formatters'

/**
 * Custom error class for PDF export failures
 * Provides user-friendly error messages
 */
export class PdfExportError extends Error {
  readonly cause?: unknown

  constructor(message: string, cause?: unknown) {
    super(message)
    this.name = 'PdfExportError'
    this.cause = cause
  }
}

/**
 * Default formatters for PDF templates
 */
const defaultFormatters: TemplateFormatters = {
  formatDate,
  formatDateRange,
  formatEducationDateRange,
  formatContactLine,
  formatDegreeField,
}

/**
 * Validates CV data before export
 * @throws PdfExportError if validation fails
 */
function validateCv(cv: CvModel): void {
  if (!cv.profile.fullName?.trim()) {
    throw new PdfExportError('Cannot export CV: Full name is required')
  }
}

/**
 * Exports a CV to PDF format
 *
 * @param cv - The CV data to export
 * @param templateId - The template to use for rendering
 * @returns Promise resolving to a Blob containing the PDF data
 * @throws PdfExportError if export fails
 *
 * @example
 * ```ts
 * const blob = await exportPdf(cv, 'v1')
 * const url = URL.createObjectURL(blob)
 * ```
 */
export async function exportPdf(cv: CvModel, templateId: PdfTemplateId): Promise<Blob> {
  validateCv(cv)

  try {
    // Currently only v1 is supported, but structure allows easy addition
    if (templateId !== 'v1') {
      throw new PdfExportError(`Unknown template: ${templateId}`)
    }

    const blob = await pdf(<TemplateV1Pdf cv={cv} formatters={defaultFormatters} />).toBlob()
    return blob
  } catch (error) {
    if (error instanceof PdfExportError) {
      throw error
    }
    throw new PdfExportError(
      'Failed to generate PDF. Please try again or contact support if the issue persists.',
      error
    )
  }
}
