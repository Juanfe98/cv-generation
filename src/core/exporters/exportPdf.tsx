import { pdf } from '@react-pdf/renderer'
import type { CvModel, TemplateId } from '../cv/types'
import type { TemplateFormatters } from '../templates'
import { getPdfTemplate } from '../templates'
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
 * Result of PDF export operation
 */
export interface ExportPdfResult {
  blob: Blob
  usedFallback: boolean
  fallbackMessage?: string
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
 * @returns Promise resolving to ExportPdfResult containing the PDF blob and fallback info
 * @throws PdfExportError if export fails
 *
 * @example
 * ```ts
 * const result = await exportPdf(cv, 'modern')
 * if (result.usedFallback) {
 *   console.log(result.fallbackMessage)
 * }
 * const url = URL.createObjectURL(result.blob)
 * ```
 */
export async function exportPdf(cv: CvModel, templateId: TemplateId): Promise<ExportPdfResult> {
  validateCv(cv)

  try {
    const PdfTemplate = getPdfTemplate(templateId)
    const blob = await pdf(<PdfTemplate cv={cv} formatters={defaultFormatters} />).toBlob()
    return { blob, usedFallback: false }
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
