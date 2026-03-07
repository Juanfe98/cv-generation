import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { EducationSection } from './EducationSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <EducationSection />
    </CvProvider>
  )
}

const createCvWithEducation = (education: Array<{
  id: string
  institution: string
  degree?: string
  field?: string
  startDate?: string
  endDate?: string
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
  education: education.map(e => ({
    id: e.id,
    institution: e.institution,
    degree: e.degree ?? '',
    field: e.field ?? '',
    startDate: e.startDate ?? '',
    endDate: e.endDate ?? '',
  })),
  skills: [],
  projects: [],
  languages: [],
  certifications: [],
  additionalInfo: '',
})

describe('EducationSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows empty state when no education entries', () => {
    renderWithProvider()
    expect(screen.getByText(/no education entries yet/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add education/i })).toBeInTheDocument()
  })

  it('renders existing education from cv', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithEducation([
          { id: '1', institution: 'MIT', degree: 'BS', field: 'Computer Science' },
          { id: '2', institution: 'Stanford', degree: 'MS', field: 'AI' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('MIT')).toBeInTheDocument()
    expect(screen.getByText('BS in Computer Science')).toBeInTheDocument()
    expect(screen.getByText('Stanford')).toBeInTheDocument()
    expect(screen.getByText('MS in AI')).toBeInTheDocument()
  })

  it('adds a new education entry and verifies it appears in summary', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add education/i }))

    await user.type(screen.getByLabelText(/institution/i), 'Harvard University')
    await user.type(screen.getByLabelText(/degree/i), 'Bachelor of Arts')
    await user.type(screen.getByLabelText(/field of study/i), 'Economics')
    await user.type(screen.getByLabelText(/start date/i), '2018-09')
    await user.type(screen.getByLabelText(/end date/i), '2022-05')

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText('Harvard University')).toBeInTheDocument()
      expect(screen.getByText('Bachelor of Arts in Economics')).toBeInTheDocument()
      expect(screen.getByText('2018-09 - 2022-05')).toBeInTheDocument()
    })
  })

  it('shows validation error when institution is empty', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add education/i }))
    // Type in a non-required field to make form dirty
    await user.type(screen.getByLabelText(/degree/i), 'BS')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await waitFor(() => {
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
    })
  })

  it('edits an existing education entry', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithEducation([
          { id: '1', institution: 'Old University', degree: 'BS', field: 'Math' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /edit/i }))

    const institutionInput = screen.getByLabelText(/institution/i)
    await user.clear(institutionInput)
    await user.type(institutionInput, 'New University')

    await user.click(screen.getByRole('button', { name: /update/i }))

    await waitFor(() => {
      expect(screen.getByText('New University')).toBeInTheDocument()
      expect(screen.queryByText('Old University')).not.toBeInTheDocument()
    })
  })

  it('deletes an education entry', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithEducation([
          { id: '1', institution: 'To Delete', degree: 'BS' },
        ])
      )
    )

    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByText('To Delete')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByText('To Delete')).not.toBeInTheDocument()
      expect(screen.getByText(/no education entries yet/i)).toBeInTheDocument()
    })
  })

  it('cancels adding without saving', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /add education/i }))
    await user.type(screen.getByLabelText(/institution/i), 'Not Saved')
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByText('Not Saved')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add education/i })).toBeInTheDocument()
  })

  it('displays only degree when field is empty', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithEducation([
          { id: '1', institution: 'University', degree: 'PhD', field: '' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('PhD')).toBeInTheDocument()
  })

  it('displays only field when degree is empty', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        createCvWithEducation([
          { id: '1', institution: 'University', degree: '', field: 'Biology' },
        ])
      )
    )

    renderWithProvider()

    expect(screen.getByText('Biology')).toBeInTheDocument()
  })
})
