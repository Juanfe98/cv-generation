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
  settings: { templateId, accentColor: 'blue', spacingPreset: 'standard' },
})

describe('TemplateSelector', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('displays the current template name', () => {
    renderWithProvider()

    expect(screen.getByText('Current template')).toBeInTheDocument()
    expect(screen.getByText('Classic')).toBeInTheDocument()
  })

  it('displays correct template from stored CV', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(createCvWithTemplate('modern')))

    renderWithProvider()

    expect(screen.getByText('Modern')).toBeInTheDocument()
  })

  it('has a Browse Templates button', () => {
    renderWithProvider()

    expect(screen.getByRole('button', { name: /browse templates/i })).toBeInTheDocument()
  })

  it('opens the gallery modal when clicking Browse Templates', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /browse templates/i }))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Choose a Template')).toBeInTheDocument()
  })

  it('closes the gallery modal when clicking close button', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /browse templates/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close gallery/i }))

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('closes the gallery modal when pressing Escape', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /browse templates/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  it('selects a template and closes the modal', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /browse templates/i }))

    // Find and click the Modern template card by its description
    const modernCard = screen.getByRole('button', { name: /contemporary design/i })
    await user.click(modernCard)

    // Modal should close
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    // Template should be updated
    expect(screen.getByText('Modern')).toBeInTheDocument()
  })

  it('persists selection to localStorage', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByRole('button', { name: /browse templates/i }))

    // Find the Executive template card by its description
    const executiveCard = screen.getByRole('button', { name: /senior professionals/i })
    await user.click(executiveCard)

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(stored.settings?.templateId).toBe('executive')
    })
  })
})
