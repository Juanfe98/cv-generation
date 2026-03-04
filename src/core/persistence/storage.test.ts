import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadCv, saveCv, resetCv } from './storage'
import { STORAGE_KEY } from './constants'
import { createEmptyCv, CURRENT_SCHEMA_VERSION } from '../cv'

describe('loadCv', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('returns empty CV when storage is missing', () => {
    const cv = loadCv()

    expect(cv).toEqual(createEmptyCv())
  })

  it('returns empty CV on invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, 'not valid json {{{')
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const cv = loadCv()

    expect(cv).toEqual(createEmptyCv())
    expect(warnSpy).toHaveBeenCalled()
  })

  it('returns empty CV on invalid schema', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ invalid: 'data' }))
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const cv = loadCv()

    expect(cv).toEqual(createEmptyCv())
    expect(warnSpy).toHaveBeenCalled()
  })

  it('returns valid CV from storage', () => {
    const validCv = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      profile: {
        fullName: 'John Doe',
        headline: 'Developer',
        location: 'NYC',
        email: 'john@example.com',
        phone: '',
        website: '',
        links: [],
      },
      experience: [],
      education: [],
      skills: ['TypeScript'],
      projects: [],
      languages: [],
      certifications: [],
      additionalInfo: '',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validCv))

    const cv = loadCv()

    expect(cv.profile.fullName).toBe('John Doe')
    expect(cv.skills).toEqual(['TypeScript'])
  })
})

describe('saveCv', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('writes correct payload to localStorage', () => {
    const cv = {
      ...createEmptyCv(),
      profile: {
        ...createEmptyCv().profile,
        fullName: 'Jane Doe',
      },
    }

    saveCv(cv)

    const stored = localStorage.getItem(STORAGE_KEY)
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored!)
    expect(parsed.profile.fullName).toBe('Jane Doe')
  })
})

describe('resetCv', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('clears storage and returns empty CV', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ some: 'data' }))

    const cv = resetCv()

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(cv).toEqual(createEmptyCv())
  })
})
