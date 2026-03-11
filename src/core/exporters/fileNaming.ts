import type { CvModel } from '../cv/types'

/**
 * Sanitizes a filename by removing illegal characters and normalizing whitespace
 * @param name - The name to sanitize
 * @returns Sanitized string in kebab-case, safe for filenames
 */
export function sanitizeFileName(name: string): string {
  return (
    name
      // Remove characters illegal in filenames across OS (Windows is most restrictive)
      // Also remove quotes and apostrophes for cleaner filenames
      .replace(/[<>:"/\\|?*']/g, '')
      // Replace whitespace sequences with single hyphen
      .replace(/\s+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Convert to lowercase
      .toLowerCase()
      // Trim to reasonable length (50 chars)
      .slice(0, 50)
  )
}

/**
 * Builds a filename for CV exports
 * @param cv - The CV model containing profile info
 * @param extension - File extension (e.g., 'pdf', 'docx')
 * @returns Filename like "john-doe-20260306.pdf"
 */
export function buildExportFileName(cv: CvModel, extension: string): string {
  const name = sanitizeFileName(cv.profile.fullName) || 'cv'
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  return `${name}-${date}.${extension}`
}
