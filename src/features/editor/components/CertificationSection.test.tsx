import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { CertificationSection } from './CertificationSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <CertificationSection />
    </CvProvider>
  )
}

const createCvWithCertifications = (certifications: Array<{
  id: string
  name: string
  issuer?: string
  date?: string
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
  languages: [],
  certifications: certifications.map(c => ({
    id: c.id,
    name: c.name,
    issuer: c.issuer ?? '',
    date: c.date ?? '',
  })),
  additionalInfo: '',
})

describe('CertificationSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows empty state when no certifications', () => {
    renderWithProvider()
    expect(screen.getByText(/no certifications yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add certification/i })).toBeInTheDocument()
  })

  it('renders existing certifications from cv', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithCertifications([
          { id: '1', name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2024-01' },
          { id: '2', name: 'PMP', issuer: 'PMI' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('AWS Solutions Architect')).toBeInTheDocument()
    expect(screen.getByText('Amazon')).toBeInTheDocument()
    expect(screen.getByText('2024-01')).toBeInTheDocument()
    expect(screen.getByText('PMP')).toBeInTheDocument()
    expect(screen.getByText('PMI')).toBeInTheDocument()
  })

  it('adds a new certification and saves it', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add certification/i }))

    await user.type(screen.getByLabelText(/certification name/i), 'Google Cloud Professional')
    await user.type(screen.getByLabelText(/issuer/i), 'Google')
    await user.type(screen.getByLabelText(/date/i), '2024-03')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText('Google Cloud Professional')).toBeInTheDocument()
      expect(screen.getByText('Google')).toBeInTheDocument()
      expect(screen.getByText('2024-03')).toBeInTheDocument()
    })

    // Verify saved to localStorage (debounced)
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.certifications[0].name).toBe('Google Cloud Professional')
    })
  })

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add certification/i }))
    // Type in a non-required field to make form dirty
    await user.type(screen.getByLabelText(/issuer/i), 'AWS')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })
  })

  it('edits an existing certification', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithCertifications([
          { id: '1', name: 'Old Cert', issuer: 'Old Issuer' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const nameInput = screen.getByLabelText(/certification name/i)
    await user.clear(nameInput)
    await user.type(nameInput, 'New Cert')

    await user.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => {
      expect(screen.getByText('New Cert')).toBeInTheDocument()
      expect(screen.queryByText('Old Cert')).not.toBeInTheDocument()
    })
  })

  it('deletes a certification', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithCertifications([
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
      expect(screen.getByText(/no certifications yet/i)).toBeInTheDocument()
    })
  })

  it('cancels adding without saving', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add certification/i }))
    await user.type(screen.getByLabelText(/certification name/i), 'Not Saved')
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByText('Not Saved')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add certification/i })).toBeInTheDocument()
  })
})
