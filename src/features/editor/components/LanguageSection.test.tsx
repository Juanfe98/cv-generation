import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { LanguageSection } from './LanguageSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <LanguageSection />
    </CvProvider>
  )
}

const createCvWithLanguages = (languages: Array<{
  id: string
  name: string
  level?: string
}>) => ({
  schemaVersion: 1,
  profile: {
    fullName: 'Test User',
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
  languages: languages.map(l => ({
    id: l.id,
    name: l.name,
    level: l.level ?? '',
  })),
  certifications: [],
  additionalInfo: '',
})

describe('LanguageSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows empty state when no languages', () => {
    renderWithProvider()
    expect(screen.getByText(/no languages added yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add language/i })).toBeInTheDocument()
  })

  it('renders existing languages from cv', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithLanguages([
          { id: '1', name: 'English', level: 'Native' },
          { id: '2', name: 'Spanish', level: 'Fluent' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText(/native/i)).toBeInTheDocument()
    expect(screen.getByText('Spanish')).toBeInTheDocument()
    expect(screen.getByText(/fluent/i)).toBeInTheDocument()
  })

  it('adds a new language and saves it', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add language/i }))

    await user.type(screen.getByLabelText(/language \*/i), 'French')
    await user.type(screen.getByLabelText(/proficiency level/i), 'Intermediate')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText('French')).toBeInTheDocument()
      expect(screen.getByText(/intermediate/i)).toBeInTheDocument()
    })

    // Verify saved to localStorage (debounced)
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.languages[0].name).toBe('French')
      expect(stored.languages[0].level).toBe('Intermediate')
    })
  })

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add language/i }))
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })
  })

  it('edits an existing language', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithLanguages([
          { id: '1', name: 'Old Language', level: 'Basic' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const nameInput = screen.getByLabelText(/language \*/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'New Language')

    await user.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => {
      expect(screen.getByText('New Language')).toBeInTheDocument()
      expect(screen.queryByText('Old Language')).not.toBeInTheDocument()
    })
  })

  it('deletes a language', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithLanguages([
          { id: '1', name: 'To Delete' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByText('To Delete')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByText('To Delete')).not.toBeInTheDocument()
      expect(screen.getByText(/no languages added yet/i)).toBeInTheDocument()
    })
  })

  it('renders language without level', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithLanguages([
          { id: '1', name: 'Japanese' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('Japanese')).toBeInTheDocument()
    // Should not have a dash/level indicator
    expect(screen.queryByText('—')).not.toBeInTheDocument()
  })
})
