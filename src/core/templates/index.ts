import type { Profile } from '../cv/types'

/**
 * Template identifiers for PDF export
 */
export type PdfTemplateId = 'v1'

/**
 * Formatter functions that templates use to format CV data
 * Allows templates to remain pure and testable
 */
export interface TemplateFormatters {
  formatDate: (dateString: string) => string
  formatDateRange: (startDate: string, endDate: string, isCurrent?: boolean) => string
  formatEducationDateRange: (startDate: string, endDate: string) => string | null
  formatContactLine: (profile: Profile) => string
  formatDegreeField: (degree: string, field: string) => string
}
