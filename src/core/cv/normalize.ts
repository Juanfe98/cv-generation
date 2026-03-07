import type {
  Profile,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
} from './types'

/**
 * Trims whitespace from a string
 */
export function trimString(value: string): string {
  return value.trim()
}

/**
 * Normalizes an array of strings:
 * - Trims whitespace from each entry
 * - Removes empty entries
 */
export function normalizeStringArray(arr: string[]): string[] {
  return arr.map(s => s.trim()).filter(s => s.length > 0)
}

/**
 * Normalizes skills array:
 * - Trims whitespace from each entry
 * - Removes empty entries
 * - Removes case-insensitive duplicates (keeps first occurrence)
 */
export function normalizeSkills(skills: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []

  for (const skill of skills) {
    const trimmed = skill.trim()
    if (trimmed.length === 0) continue

    const lower = trimmed.toLowerCase()
    if (!seen.has(lower)) {
      seen.add(lower)
      result.push(trimmed)
    }
  }

  return result
}

/**
 * Normalizes profile links:
 * - Trims whitespace from label and url
 * - Removes entries with empty urls
 * - Removes exact duplicate urls
 */
export function normalizeProfileLinks(
  links: Array<{ label: string; url: string }>
): Array<{ label: string; url: string }> {
  const seenUrls = new Set<string>()
  const result: Array<{ label: string; url: string }> = []

  for (const link of links) {
    const trimmedUrl = link.url.trim()
    const trimmedLabel = link.label.trim()

    if (trimmedUrl.length === 0) continue
    if (seenUrls.has(trimmedUrl)) continue

    seenUrls.add(trimmedUrl)
    result.push({ label: trimmedLabel, url: trimmedUrl })
  }

  return result
}

/**
 * Normalizes a profile object:
 * - Trims all string fields
 * - Normalizes links array
 */
export function normalizeProfile(profile: Profile): Profile {
  return {
    fullName: profile.fullName.trim(),
    headline: profile.headline.trim(),
    location: profile.location.trim(),
    email: profile.email.trim(),
    phone: profile.phone.trim(),
    website: profile.website.trim(),
    links: normalizeProfileLinks(profile.links),
  }
}

/**
 * Normalizes an experience item:
 * - Trims string fields
 * - Normalizes highlights array
 * - Clears endDate if isCurrent is true
 */
export function normalizeExperienceItem(item: ExperienceItem): ExperienceItem {
  return {
    ...item,
    company: item.company.trim(),
    role: item.role.trim(),
    location: item.location.trim(),
    startDate: item.startDate.trim(),
    endDate: item.isCurrent ? '' : item.endDate.trim(),
    highlights: normalizeStringArray(item.highlights),
  }
}

/**
 * Normalizes an education item:
 * - Trims string fields
 */
export function normalizeEducationItem(item: EducationItem): EducationItem {
  return {
    ...item,
    institution: item.institution.trim(),
    degree: item.degree.trim(),
    field: item.field.trim(),
    startDate: item.startDate.trim(),
    endDate: item.endDate.trim(),
  }
}

/**
 * Normalizes a project item:
 * - Trims string fields
 * - Normalizes highlights array
 */
export function normalizeProjectItem(item: ProjectItem): ProjectItem {
  return {
    ...item,
    name: item.name.trim(),
    description: item.description.trim(),
    link: item.link.trim(),
    highlights: normalizeStringArray(item.highlights),
  }
}

/**
 * Normalizes a certification item:
 * - Trims string fields
 */
export function normalizeCertificationItem(
  item: CertificationItem
): CertificationItem {
  return {
    ...item,
    name: item.name.trim(),
    issuer: item.issuer.trim(),
    date: item.date.trim(),
  }
}

/**
 * Normalizes a language item:
 * - Trims string fields
 */
export function normalizeLanguageItem(item: LanguageItem): LanguageItem {
  return {
    ...item,
    name: item.name.trim(),
    level: item.level.trim(),
  }
}
