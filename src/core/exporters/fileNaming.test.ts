import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { sanitizeFileName, buildExportFileName } from './fileNaming'
import type { CvModel } from '../cv/types'

describe('sanitizeFileName', () => {
  it('converts to kebab-case', () => {
    expect(sanitizeFileName('John Doe')).toBe('john-doe')
  })

  it('removes illegal characters', () => {
    expect(sanitizeFileName('John<>:"/\\|?*Doe')).toBe('johndoe')
  })

  it('replaces multiple spaces with single hyphen', () => {
    expect(sanitizeFileName('John   Multiple   Spaces')).toBe('john-multiple-spaces')
  })

  it('removes leading and trailing hyphens', () => {
    expect(sanitizeFileName('  John Doe  ')).toBe('john-doe')
  })

  it('handles empty string', () => {
    expect(sanitizeFileName('')).toBe('')
  })

  it('handles whitespace-only string', () => {
    expect(sanitizeFileName('   ')).toBe('')
  })

  it('truncates very long names', () => {
    const longName = 'a'.repeat(100)
    expect(sanitizeFileName(longName).length).toBe(50)
  })

  it('handles names with mixed illegal characters and spaces', () => {
    expect(sanitizeFileName('John / Doe: The "Third"')).toBe('john-doe-the-third')
  })
})

describe('buildExportFileName', () => {
  const mockDate = new Date('2026-03-06T12:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockDate)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const createMinimalCv = (fullName: string): CvModel => ({
    schemaVersion: 1,
    profile: {
      fullName,
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
    settings: { templateId: 'classic' },
  })

  it('builds correct filename with name and date', () => {
    const cv = createMinimalCv('John Doe')
    expect(buildExportFileName(cv, 'pdf')).toBe('john-doe-20260306.pdf')
  })

  it('falls back to "cv" when name is empty', () => {
    const cv = createMinimalCv('')
    expect(buildExportFileName(cv, 'pdf')).toBe('cv-20260306.pdf')
  })

  it('falls back to "cv" when name is whitespace only', () => {
    const cv = createMinimalCv('   ')
    expect(buildExportFileName(cv, 'pdf')).toBe('cv-20260306.pdf')
  })

  it('works with different extensions', () => {
    const cv = createMinimalCv('Jane Smith')
    expect(buildExportFileName(cv, 'docx')).toBe('jane-smith-20260306.docx')
  })

  it('sanitizes names with special characters', () => {
    const cv = createMinimalCv('Jean-Pierre O\'Connor')
    expect(buildExportFileName(cv, 'pdf')).toBe('jean-pierre-oconnor-20260306.pdf')
  })
})
