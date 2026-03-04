import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePersistedCv } from './usePersistedCv'
import { STORAGE_KEY, createEmptyCv, CURRENT_SCHEMA_VERSION } from '../../core'

describe('usePersistedCv', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('loads CV from storage on mount', () => {
    const storedCv = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      profile: {
        fullName: 'John Doe',
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
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedCv))

    const { result } = renderHook(() => usePersistedCv())

    expect(result.current[0].profile.fullName).toBe('John Doe')
  })

  it('returns empty CV when storage is empty', () => {
    const { result } = renderHook(() => usePersistedCv())

    expect(result.current[0]).toEqual(createEmptyCv())
  })

  it('auto-saves after debounce when setCv is called', async () => {
    const { result } = renderHook(() => usePersistedCv())

    act(() => {
      result.current[1]((prev) => ({
        ...prev,
        profile: { ...prev.profile, fullName: 'Jane Doe' },
      }))
    })

    // Before debounce completes
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()

    // After debounce
    act(() => {
      vi.advanceTimersByTime(300)
    })

    const stored = localStorage.getItem(STORAGE_KEY)
    expect(stored).not.toBeNull()
    expect(JSON.parse(stored!).profile.fullName).toBe('Jane Doe')
  })

  it('reset clears storage and returns empty CV', () => {
    const storedCv = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      profile: {
        fullName: 'John Doe',
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
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedCv))

    const { result } = renderHook(() => usePersistedCv())

    act(() => {
      result.current[2].reset()
    })

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
    expect(result.current[0]).toEqual(createEmptyCv())
  })

  it('does not save on initial mount', () => {
    renderHook(() => usePersistedCv())

    // Advance past debounce time
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Storage should still be empty since no setCv was called
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })
})
