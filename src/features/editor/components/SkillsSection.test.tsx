import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { SkillsSection } from './SkillsSection'

function renderWithProvider() {
  return render(
    <CvProvider>
      <SkillsSection />
    </CvProvider>
  )
}

const createCvWithSkills = (skills: string[]) => ({
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
  skills,
  projects: [],
  languages: [],
  certifications: [],
  additionalInfo: '',
})

describe('SkillsSection', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows empty state when no skills', () => {
    renderWithProvider()
    expect(screen.getByText(/add technical skills, tools, or areas of expertise/i)).toBeInTheDocument()
  })

  it('renders existing skills from cv', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(createCvWithSkills(['React', 'TypeScript', 'Node.js']))
    )

    renderWithProvider()

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('adds skills and saves them', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const input = screen.getByLabelText(/add skill/i)

    // Add first skill
    await user.type(input, 'React')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    // Add second skill
    await user.type(input, 'TypeScript')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    // Verify skills appear as chips
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()

    // Save
    await user.click(screen.getByRole('button', { name: /save/i }))

    // Verify saved to localStorage
    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.skills).toEqual(['React', 'TypeScript'])
    })
  })

  it('adds skill on Enter key', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const input = screen.getByLabelText(/add skill/i)
    await user.type(input, 'React{enter}')

    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('prevents adding empty skills', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /^add$/i }))

    expect(screen.getByText(/skill cannot be empty/i)).toBeInTheDocument()
  })

  it('prevents adding duplicate skills (case-insensitive)', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const input = screen.getByLabelText(/add skill/i)

    await user.type(input, 'React')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    await user.type(input, 'react')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    expect(screen.getByText(/skill already exists/i)).toBeInTheDocument()
    expect(screen.getAllByText('React')).toHaveLength(1)
  })

  it('trims whitespace from skills', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const input = screen.getByLabelText(/add skill/i)
    await user.type(input, '  React  ')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('removes a skill', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(createCvWithSkills(['React', 'TypeScript']))
    )

    const user = userEvent.setup()
    renderWithProvider()

    expect(screen.getByText('React')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove react/i }))

    expect(screen.queryByText('React')).not.toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('cancels changes and reverts to saved state', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(createCvWithSkills(['React']))
    )

    const user = userEvent.setup()
    renderWithProvider()

    const input = screen.getByLabelText(/add skill/i)
    await user.type(input, 'TypeScript')
    await user.click(screen.getByRole('button', { name: /^add$/i }))

    expect(screen.getByText('TypeScript')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.queryByText('TypeScript')).not.toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('hides save/cancel buttons when not dirty', () => {
    renderWithProvider()

    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument()
  })
})
