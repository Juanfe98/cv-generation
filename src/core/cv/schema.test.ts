import { describe, it, expect } from 'vitest'
import { createEmptyCv, parseCv, safeParseCv, CURRENT_SCHEMA_VERSION } from './index'

describe('createEmptyCv', () => {
  it('returns a valid empty CV with correct schema version', () => {
    const cv = createEmptyCv()

    expect(cv.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
  })

  it('has empty profile with all required fields', () => {
    const cv = createEmptyCv()

    expect(cv.profile).toEqual({
      fullName: '',
      headline: '',
      location: '',
      email: '',
      phone: '',
      website: '',
      links: [],
    })
  })

  it('has empty arrays for all collection fields', () => {
    const cv = createEmptyCv()

    expect(cv.experience).toEqual([])
    expect(cv.education).toEqual([])
    expect(cv.skills).toEqual([])
    expect(cv.projects).toEqual([])
    expect(cv.languages).toEqual([])
    expect(cv.certifications).toEqual([])
  })

  it('has empty string for additionalInfo', () => {
    const cv = createEmptyCv()

    expect(cv.additionalInfo).toBe('')
  })

  it('has default settings with classic template', () => {
    const cv = createEmptyCv()

    expect(cv.settings).toEqual({ templateId: 'classic' })
  })
})

describe('parseCv', () => {
  it('parses a valid CV model', () => {
    const input = {
      schemaVersion: 1,
      profile: {
        fullName: 'John Doe',
        headline: 'Software Engineer',
        location: 'New York',
        email: 'john@example.com',
        phone: '+1234567890',
        website: 'https://johndoe.com',
        links: [{ label: 'GitHub', url: 'https://github.com/johndoe' }],
      },
      experience: [
        {
          id: '1',
          company: 'Acme Inc',
          role: 'Developer',
          location: 'Remote',
          startDate: '2020-01',
          endDate: '2023-06',
          isCurrent: false,
          highlights: ['Built features', 'Led team'],
        },
      ],
      education: [],
      skills: ['TypeScript', 'React'],
      projects: [],
      languages: [],
      certifications: [],
      additionalInfo: '',
    }

    const cv = parseCv(input)

    expect(cv.profile.fullName).toBe('John Doe')
    expect(cv.experience).toHaveLength(1)
    expect(cv.skills).toEqual(['TypeScript', 'React'])
  })

  it('rejects input missing required profile.fullName', () => {
    const input = {
      profile: {
        fullName: '', // empty - should fail
      },
    }

    const result = safeParseCv(input)

    expect(result.success).toBe(false)
  })

  it('rejects experience item missing required company', () => {
    const input = {
      profile: { fullName: 'John Doe' },
      experience: [
        {
          company: '', // empty - should fail
          role: 'Developer',
          startDate: '2020-01',
        },
      ],
    }

    const result = safeParseCv(input)

    expect(result.success).toBe(false)
  })

  it('rejects invalid date format', () => {
    const input = {
      profile: { fullName: 'John Doe' },
      experience: [
        {
          company: 'Acme',
          role: 'Developer',
          startDate: '2020/01/15', // wrong format
        },
      ],
    }

    const result = safeParseCv(input)

    expect(result.success).toBe(false)
  })

  it('rejects invalid email format', () => {
    const input = {
      profile: {
        fullName: 'John Doe',
        email: 'not-an-email',
      },
    }

    const result = safeParseCv(input)

    expect(result.success).toBe(false)
  })

  it('normalizes missing optional arrays to empty arrays', () => {
    const input = {
      profile: { fullName: 'John Doe' },
      // all arrays missing
    }

    const cv = parseCv(input)

    expect(cv.experience).toEqual([])
    expect(cv.education).toEqual([])
    expect(cv.skills).toEqual([])
    expect(cv.projects).toEqual([])
    expect(cv.languages).toEqual([])
    expect(cv.certifications).toEqual([])
    expect(cv.profile.links).toEqual([])
  })

  it('normalizes missing optional strings to empty strings', () => {
    const input = {
      profile: { fullName: 'John Doe' },
    }

    const cv = parseCv(input)

    expect(cv.profile.headline).toBe('')
    expect(cv.profile.location).toBe('')
    expect(cv.profile.phone).toBe('')
    expect(cv.additionalInfo).toBe('')
  })

  it('defaults schemaVersion if not provided', () => {
    const input = {
      profile: { fullName: 'John Doe' },
    }

    const cv = parseCv(input)

    expect(cv.schemaVersion).toBe(CURRENT_SCHEMA_VERSION)
  })

  it('generates id for items if not provided', () => {
    const input = {
      profile: { fullName: 'John Doe' },
      experience: [
        {
          company: 'Acme',
          role: 'Developer',
          startDate: '2020-01',
        },
      ],
    }

    const cv = parseCv(input)

    expect(cv.experience[0].id).toBeDefined()
    expect(typeof cv.experience[0].id).toBe('string')
    expect(cv.experience[0].id.length).toBeGreaterThan(0)
  })

  it('allows empty string for optional email', () => {
    const input = {
      profile: {
        fullName: 'John Doe',
        email: '',
      },
    }

    const result = safeParseCv(input)

    expect(result.success).toBe(true)
  })

  it('allows empty string for optional website', () => {
    const input = {
      profile: {
        fullName: 'John Doe',
        website: '',
      },
    }

    const result = safeParseCv(input)

    expect(result.success).toBe(true)
  })

  describe('settings migration', () => {
    it('adds default settings.templateId when settings is missing', () => {
      const input = {
        profile: { fullName: 'John Doe' },
        // no settings field
      }

      const cv = parseCv(input)

      expect(cv.settings).toBeDefined()
      expect(cv.settings.templateId).toBe('classic')
    })

    it('adds default templateId when settings exists but templateId is missing', () => {
      const input = {
        profile: { fullName: 'John Doe' },
        settings: {},
      }

      const cv = parseCv(input)

      expect(cv.settings.templateId).toBe('classic')
    })

    it('preserves existing templateId when provided', () => {
      const input = {
        profile: { fullName: 'John Doe' },
        settings: { templateId: 'modern' },
      }

      const cv = parseCv(input)

      expect(cv.settings.templateId).toBe('modern')
    })

    it('rejects invalid templateId values', () => {
      const input = {
        profile: { fullName: 'John Doe' },
        settings: { templateId: 'invalid-template' },
      }

      const result = safeParseCv(input)

      expect(result.success).toBe(false)
    })
  })
})
