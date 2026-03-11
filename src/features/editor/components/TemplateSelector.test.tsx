import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { TemplateSelector } from './TemplateSelector'

function renderWithProvider() {
  return render(
    <CvProvider>
      <TemplateSelector />
    </CvProvider>
  )
}

const createCvWithTemplate = (templateId: string) => ({
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
  certifications: [],
  additionalInfo: '',
  settings: { templateId },
})

describe('TemplateSelector', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders all four template options', () => {
    renderWithProvider()

    expect(screen.getByText('Classic')).toBeInTheDocument()
    expect(screen.getByText('Modern')).toBeInTheDocument()
    expect(screen.getByText('Executive')).toBeInTheDocument()
    expect(screen.getByText('Creative')).toBeInTheDocument()
  })

  it('shows descriptions for all templates', () => {
    renderWithProvider()

    expect(screen.getByText(/professional layout/i)).toBeInTheDocument()
    expect(screen.getByText(/contemporary design/i)).toBeInTheDocument()
    expect(screen.getByText(/senior professionals/i)).toBeInTheDocument()
    expect(screen.getByText(/creative and design/i)).toBeInTheDocument()
  })

  it('shows classic as selected by default', () => {
    renderWithProvider()

    const selectedBadges = screen.getAllByText('Selected')
    expect(selectedBadges).toHaveLength(1)

    const classicButton = screen.getByRole('button', { name: /classic/i })
    expect(classicButton).toHaveClass('border-blue-500')
  })

  it('shows correct selected state from stored CV', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(createCvWithTemplate('modern')))

    renderWithProvider()

    const modernButton = screen.getByRole('button', { name: /modern/i })
    expect(modernButton).toHaveClass('border-blue-500')

    const classicButton = screen.getByRole('button', { name: /classic/i })
    expect(classicButton).not.toHaveClass('border-blue-500')
  })

  it('changes selection when clicking a different template', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const modernButton = screen.getByRole('button', { name: /modern/i })
    await user.click(modernButton)

    expect(modernButton).toHaveClass('border-blue-500')

    const classicButton = screen.getByRole('button', { name: /classic/i })
    expect(classicButton).not.toHaveClass('border-blue-500')
  })

  it('persists selection to localStorage', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    const executiveButton = screen.getByRole('button', { name: /executive/i })
    await user.click(executiveButton)

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.settings?.templateId).toBe('executive')
    })
  })

  it('renders as a 2-column grid', () => {
    const { container } = renderWithProvider()

    const grid = container.querySelector('.grid-cols-2')
    expect(grid).toBeInTheDocument()
  })
})
