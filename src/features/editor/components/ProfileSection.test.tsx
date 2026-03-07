import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
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
  })

  it('renders all profile fields', () => {
    renderWithProvider()

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/headline/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/website/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
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

  it('shows validation error for empty fullName on submit', async () => {
    // Start with existing name so we can clear it and form remains dirty
    const existingCv = {
      schemaVersion: 1,
      profile: {
        fullName: 'Existing Name',
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingCv))

    const user = userEvent.setup()
    renderWithProvider()

    const nameInput = screen.getByLabelText(/full name/i)
    await user.clear(nameInput)

    await user.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })
  })

  it('updates cv.profile on save', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/headline/i), 'Software Engineer')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/location/i), 'New York, NY')

    await user.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.profile.fullName).toBe('John Doe')
      expect(stored.profile.headline).toBe('Software Engineer')
      expect(stored.profile.email).toBe('john@example.com')
      expect(stored.profile.location).toBe('New York, NY')
    })
  })

  it('disables save button when form is not dirty', () => {
    renderWithProvider()

    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
  })

  it('enables save button when form is dirty', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.type(screen.getByLabelText(/full name/i), 'Test')

    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled()
  })

  it('disables save button after successful save', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    expect(screen.getByRole('button', { name: /save/i })).toBeEnabled()

    await user.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
    })
  })
})
