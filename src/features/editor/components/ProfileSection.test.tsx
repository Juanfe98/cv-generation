import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { ProfileSection } from './ProfileSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <ProfileSection />
    </CvProvider>
  )
}

describe('ProfileSection', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  it('renders all profile fields', () => {
    renderWithProvider()

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/headline/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument()
  })

  it('renders existing name from cv', () => {
    const existingCv = {
      schemaVersion: 1,
      profile: {
        fullName: 'Jane Smith',
        headline: 'Developer',
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingCv))

    renderWithProvider()

    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Smith')
    expect(screen.getByLabelText(/headline/i)).toHaveValue('Developer')
  })

  it('auto-syncs profile changes to CV context after debounce', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider()

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')

    // Wait for debounce (300ms)
    await vi.advanceTimersByTimeAsync(350)

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.profile.fullName).toBe('John Doe')
    })
  })

  it('updates multiple fields and syncs after debounce', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider()

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/headline/i), 'Software Engineer')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/location/i), 'New York, NY')

    // Wait for debounce
    await vi.advanceTimersByTimeAsync(350)

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.profile.fullName).toBe('John Doe')
      expect(stored.profile.headline).toBe('Software Engineer')
      expect(stored.profile.email).toBe('john@example.com')
      expect(stored.profile.location).toBe('New York, NY')
    })
  })

  it('debounces rapid input changes', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    renderWithProvider()

    // Type rapidly
    await user.type(screen.getByLabelText(/full name/i), 'A')
    await vi.advanceTimersByTimeAsync(100)
    await user.type(screen.getByLabelText(/full name/i), 'B')
    await vi.advanceTimersByTimeAsync(100)
    await user.type(screen.getByLabelText(/full name/i), 'C')

    // Before debounce completes, storage should not have the full value
    let stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    expect(stored.profile?.fullName || '').not.toBe('ABC')

    // After debounce
    await vi.advanceTimersByTimeAsync(350)

    await waitFor(() => {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.profile.fullName).toBe('ABC')
    })
  })
})
