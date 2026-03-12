import { z } from 'zod'
import { CURRENT_SCHEMA_VERSION } from './types'
import type { CvModel } from './types'

/**
 * Date string in YYYY-MM format
 * Examples: "2024-03", "2020-12"
 */
const dateStringSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, {
  message: 'Date must be in YYYY-MM format',
})

const optionalDateString = z
  .string()
  .regex(/^(\d{4}-(0[1-9]|1[0-2]))?$/)
  .or(z.literal(''))
  .default('')

const nonEmptyString = z.string().min(1, 'This field is required')

const profileLinkSchema = z.object({
  label: z.string().default(''),
  url: z.string().default(''),
})

export const profileSchema = z.object({
  fullName: nonEmptyString,
  headline: z.string().default(''),
  location: z.string().default(''),
  email: z.string().email().or(z.literal('')).default(''),
  phone: z.string().default(''),
  website: z.string().url().or(z.literal('')).default(''),
  links: z.array(profileLinkSchema).default([]),
})

export const experienceItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  company: nonEmptyString,
  role: nonEmptyString,
  location: z.string().default(''),
  startDate: dateStringSchema,
  endDate: optionalDateString,
  isCurrent: z.boolean().default(false),
  highlights: z.array(z.string()).default([]),
})

export const educationItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  institution: nonEmptyString,
  degree: z.string().default(''),
  field: z.string().default(''),
  startDate: optionalDateString,
  endDate: optionalDateString,
})

export const projectItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: nonEmptyString,
  description: z.string().default(''),
  highlights: z.array(z.string()).default([]),
  link: z.string().url().or(z.literal('')).default(''),
})

export const languageItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: nonEmptyString,
  level: z.string().default(''),
})

export const certificationItemSchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: nonEmptyString,
  issuer: z.string().default(''),
  date: optionalDateString,
})

const templateIdSchema = z.enum(['classic', 'modern', 'executive', 'creative'])
const accentColorSchema = z.enum(['blue', 'emerald', 'violet', 'amber'])
const spacingPresetSchema = z.enum(['compact', 'standard', 'relaxed'])

export const cvSettingsSchema = z.object({
  templateId: templateIdSchema.default('classic'),
  accentColor: accentColorSchema.default('blue'),
  spacingPreset: spacingPresetSchema.default('standard'),
})

export const cvModelSchema = z.object({
  schemaVersion: z.number().default(CURRENT_SCHEMA_VERSION),
  profile: profileSchema,
  experience: z.array(experienceItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  skills: z.array(z.string().min(1)).default([]),
  projects: z.array(projectItemSchema).default([]),
  languages: z.array(languageItemSchema).default([]),
  certifications: z.array(certificationItemSchema).default([]),
  additionalInfo: z.string().default(''),
  settings: cvSettingsSchema.default({ templateId: 'classic', accentColor: 'blue', spacingPreset: 'standard' }),
})

/**
 * Creates an empty CV with all defaults applied
 */
export function createEmptyCv(): CvModel {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    profile: {
      fullName: '',
      headline: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      links: [],
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    additionalInfo: '',
    settings: { templateId: 'classic', accentColor: 'blue', spacingPreset: 'standard' },
  }
}

/**
 * Parses and validates input as a CvModel
 * Applies defaults for missing optional fields
 * Throws ZodError if validation fails
 */
export function parseCv(input: unknown): CvModel {
  return cvModelSchema.parse(input)
}

/**
 * Safely parses input as a CvModel
 * Returns { success: true, data: CvModel } or { success: false, error: ZodError }
 */
export function safeParseCv(input: unknown) {
  return cvModelSchema.safeParse(input)
}
