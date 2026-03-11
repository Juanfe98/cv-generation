/**
 * CV Domain Model Types
 *
 * This is the single source of truth for CV data structure.
 * Used by editor, preview, and exporters.
 *
 * Date format: YYYY-MM (e.g., "2024-03")
 */

export const CURRENT_SCHEMA_VERSION = 1

/** YYYY-MM format date string */
export type DateString = string

export type TemplateId = 'classic' | 'modern' | 'executive' | 'creative'

export interface CvSettings {
  templateId: TemplateId
}

export interface ProfileLink {
  label: string
  url: string
}

export interface Profile {
  fullName: string
  headline: string
  location: string
  email: string
  phone: string
  website: string
  links: ProfileLink[]
}

export interface ExperienceItem {
  id: string
  company: string
  role: string
  location: string
  startDate: DateString
  endDate: DateString
  isCurrent: boolean
  highlights: string[]
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  startDate: DateString
  endDate: DateString
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  highlights: string[]
  link: string
}

export interface LanguageItem {
  id: string
  name: string
  level: string
}

export interface CertificationItem {
  id: string
  name: string
  issuer: string
  date: DateString
}

export interface CvModel {
  schemaVersion: number
  profile: Profile
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  projects: ProjectItem[]
  languages: LanguageItem[]
  certifications: CertificationItem[]
  additionalInfo: string
  settings: CvSettings
}
