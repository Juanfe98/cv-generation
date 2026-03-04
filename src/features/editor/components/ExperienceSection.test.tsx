import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { ExperienceSection } from './ExperienceSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <ExperienceSection />
    </CvProvider>
  )
}

const createCvWithExperience = (experiences: Array<{
  id: string
  company: string
  role: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent?: boolean
  highlights?: string[]
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
  experience: experiences.map(e => ({
    id: e.id,
    company: e.company,
    role: e.role,
    location: e.location ?? '',
    startDate: e.startDate,
    endDate: e.endDate ?? '',
    isCurrent: e.isCurrent ?? false,
    highlights: e.highlights ?? [],
  })),
  education: [],
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  additionalInfo: '',
})

describe('ExperienceSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows empty state when no experiences', () => {
    renderWithProvider()
    expect(screen.getByText(/no experience entries yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add experience/i })).toBeInTheDocument()
  })

  it('renders existing experiences from cv', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithExperience([
          { id: '1', company: 'Acme Corp', role: 'Engineer', startDate: '2022-01' },
          { id: '2', company: 'Beta Inc', role: 'Lead', startDate: '2020-05', endDate: '2021-12' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('Beta Inc')).toBeInTheDocument()
    expect(screen.getByText('Lead')).toBeInTheDocument()
  })

  it('adds a new experience', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add experience/i }))

    await user.type(screen.getByLabelText(/company/i), 'New Company')
    await user.type(screen.getByLabelText(/role/i), 'Developer')
    await user.type(screen.getByLabelText(/start date/i), '2023-06')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText('New Company')).toBeInTheDocument()
      expect(screen.getByText('Developer')).toBeInTheDocument()
    })
  })

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add experience/i }))
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThanOrEqual(2)
    })
  })

  it('edits an existing experience', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithExperience([
          { id: '1', company: 'Old Company', role: 'Old Role', startDate: '2022-01' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const companyInput = screen.getByLabelText(/company/i)
    await user.clear(companyInput)
    await user.type(companyInput, 'Updated Company')

    await user.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => {
      expect(screen.getByText('Updated Company')).toBeInTheDocument()
      expect(screen.queryByText('Old Company')).not.toBeInTheDocument()
    })
  })

  it('deletes an experience', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithExperience([
          { id: '1', company: 'To Delete', role: 'Role', startDate: '2022-01' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByText('To Delete')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByText('To Delete')).not.toBeInTheDocument()
      expect(screen.getByText(/no experience entries yet/i)).toBeInTheDocument()
    })
  })

  it('reorders experiences with move up/down buttons', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithExperience([
          { id: '1', company: 'First', role: 'Role1', startDate: '2022-01' },
          { id: '2', company: 'Second', role: 'Role2', startDate: '2021-01' },
          { id: '3', company: 'Third', role: 'Role3', startDate: '2020-01' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    // Get all experience cards
    const cards = screen
      .getAllByText(/Role\d/)
      .map(el => el.closest('div[class*="rounded-lg"]') as HTMLElement)

    // First item's move up should be disabled
    const firstCard = cards[0]
    expect(within(firstCard).getByRole('button', { name: /move up/i })).toBeDisabled()

    // Last item's move down should be disabled
    const lastCard = cards[2]
    expect(within(lastCard).getByRole('button', { name: /move down/i })).toBeDisabled()

    // Move second item up
    const secondCard = cards[1]
    await user.click(within(secondCard).getByRole('button', { name: /move up/i }))

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.experience[0].company).toBe('Second')
      expect(stored.experience[1].company).toBe('First')
    })
  })

  it('clears endDate when isCurrent is checked', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add experience/i }))

    await user.type(screen.getByLabelText(/company/i), 'Current Job')
    await user.type(screen.getByLabelText(/role/i), 'Developer')
    await user.type(screen.getByLabelText(/start date/i), '2023-01')
    await user.type(screen.getByLabelText(/end date/i), '2024-01')
    await user.click(screen.getByLabelText(/i currently work here/i))

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.experience[0].isCurrent).toBe(true)
      expect(stored.experience[0].endDate).toBe('')
    })
  })

  it('displays "Present" for current positions', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithExperience([
          { id: '1', company: 'Current Co', role: 'Dev', startDate: '2023-01', isCurrent: true },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText(/present/i)).toBeInTheDocument()
  })

  it('cancels adding without saving', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add experience/i }))
    await user.type(screen.getByLabelText(/company/i), 'Not Saved')
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByText('Not Saved')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add experience/i })).toBeInTheDocument()
  })
})
