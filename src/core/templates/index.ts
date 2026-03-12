import type { ComponentType } from 'react'
import type { CvModel, Profile, TemplateId } from '../cv/types'
import { ClassicPdf } from './classic/pdf/ClassicPdf'
import { ModernPdf } from './modern/pdf/ModernPdf'
import { ExecutivePdf } from './executive/pdf/ExecutivePdf'
import { CreativePdf } from './creative/pdf/CreativePdf'

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

/**
 * Props interface for all PDF template components
 */
export interface PdfTemplateProps {
  cv: CvModel
  formatters: TemplateFormatters
}

/**
 * Registry mapping template IDs to their PDF renderer components.
 */
export const PDF_TEMPLATE_REGISTRY: Record<TemplateId, ComponentType<PdfTemplateProps>> = {
  classic: ClassicPdf,
  modern: ModernPdf,
  executive: ExecutivePdf,
  creative: CreativePdf,
}

/**
 * Get the PDF template component for a given template ID.
 */
export function getPdfTemplate(id: TemplateId): ComponentType<PdfTemplateProps> {
  return PDF_TEMPLATE_REGISTRY[id]
}
