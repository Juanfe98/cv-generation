import type { Profile } from '../cv/types'

/**
 * Formats a YYYY-MM date string to human readable format
 * @param dateString - Date in "YYYY-MM" format (e.g., "2024-01")
 * @returns Formatted date (e.g., "Jan 2024") or empty string if invalid
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ''
  const [year, month] = dateString.split('-')
  if (!year || !month) return ''
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/**
 * Formats a date range for experience entries
 * @param startDate - Start date in "YYYY-MM" format
 * @param endDate - End date in "YYYY-MM" format (ignored if isCurrent is true)
 * @param isCurrent - Whether this is a current/ongoing position
 * @returns Formatted date range (e.g., "Jan 2022 – Present" or "Jan 2020 – Dec 2022")
 */
export function formatDateRange(
  startDate: string,
  endDate: string,
  isCurrent = false
): string {
  const start = formatDate(startDate)
  if (isCurrent) {
    return `${start} – Present`
  }
  const end = formatDate(endDate)
  return `${start} – ${end}`
}

/**
 * Formats a date range for education entries (uses '?' for missing dates)
 * @param startDate - Start date in "YYYY-MM" format
 * @param endDate - End date in "YYYY-MM" format
 * @returns Formatted date range or null if both dates are empty
 */
export function formatEducationDateRange(
  startDate: string,
  endDate: string
): string | null {
  if (!startDate && !endDate) return null
  const start = formatDate(startDate) || '?'
  const end = formatDate(endDate) || '?'
  return `${start} – ${end}`
}

/**
 * Formats contact information into a single line
 * @param profile - Profile object containing contact fields
 * @returns Contact line (e.g., "email@example.com • 555-1234 • New York") or empty string
 */
export function formatContactLine(profile: Profile): string {
  const items = [
    profile.email,
    profile.phone,
    profile.location,
    profile.website,
  ].filter(Boolean)
  return items.join(' • ')
}

/**
 * Formats degree and field of study into a single string
 * @param degree - Degree name (e.g., "Bachelor of Science")
 * @param field - Field of study (e.g., "Computer Science")
 * @returns Combined string (e.g., "Bachelor of Science in Computer Science")
 */
export function formatDegreeField(degree: string, field: string): string {
  if (degree && field) return `${degree} in ${field}`
  if (degree) return degree
  if (field) return field
  return ''
}
