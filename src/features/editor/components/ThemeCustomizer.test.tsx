import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { CvProvider } from '../../../app/providers'
import { STORAGE_KEY } from '../../../core'
import { ThemeCustomizer } from './ThemeCustomizer'

function renderWithProvider() {
  return render(
    <CvProvider>
      <ThemeCustomizer />
    </CvProvider>
  )
}

const createCvWithTheme = (accentColor: string, spacingPreset: string) => ({
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
  settings: { templateId: 'classic', accentColor, spacingPreset },
})

describe('ThemeCustomizer', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Accent Color Picker', () => {
    it('renders accent color label and buttons', () => {
      renderWithProvider()

      expect(screen.getByText('Accent Color')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /select blue accent/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /select emerald accent/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /select violet accent/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /select amber accent/i })).toBeInTheDocument()
    })

    it('shows blue as selected by default', () => {
      renderWithProvider()

      const blueButton = screen.getByRole('button', { name: /select blue accent/i })
      expect(blueButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('shows correct accent from stored CV', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(createCvWithTheme('violet', 'standard')))

      renderWithProvider()

      const violetButton = screen.getByRole('button', { name: /select violet accent/i })
      expect(violetButton).toHaveAttribute('aria-pressed', 'true')

      const blueButton = screen.getByRole('button', { name: /select blue accent/i })
      expect(blueButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('changes accent color when clicking a different swatch', async () => {
      const user = userEvent.setup()
      renderWithProvider()

      const emeraldButton = screen.getByRole('button', { name: /select emerald accent/i })
      await user.click(emeraldButton)

      expect(emeraldButton).toHaveAttribute('aria-pressed', 'true')

      const blueButton = screen.getByRole('button', { name: /select blue accent/i })
      expect(blueButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('persists accent color selection to localStorage', async () => {
      const user = userEvent.setup()
      renderWithProvider()

      await user.click(screen.getByRole('button', { name: /select amber accent/i }))

      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        expect(stored.settings?.accentColor).toBe('amber')
      })
    })
  })

  describe('Spacing Preset Selector', () => {
    it('renders spacing label and buttons', () => {
      renderWithProvider()

      expect(screen.getByText('Spacing')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /compact/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /standard/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /relaxed/i })).toBeInTheDocument()
    })

    it('shows standard as selected by default', () => {
      renderWithProvider()

      const standardButton = screen.getByRole('button', { name: /standard/i })
      expect(standardButton).toHaveAttribute('aria-pressed', 'true')
    })

    it('shows correct spacing from stored CV', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(createCvWithTheme('blue', 'compact')))

      renderWithProvider()

      const compactButton = screen.getByRole('button', { name: /compact/i })
      expect(compactButton).toHaveAttribute('aria-pressed', 'true')

      const standardButton = screen.getByRole('button', { name: /standard/i })
      expect(standardButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('changes spacing preset when clicking a different option', async () => {
      const user = userEvent.setup()
      renderWithProvider()

      const relaxedButton = screen.getByRole('button', { name: /relaxed/i })
      await user.click(relaxedButton)

      expect(relaxedButton).toHaveAttribute('aria-pressed', 'true')

      const standardButton = screen.getByRole('button', { name: /standard/i })
      expect(standardButton).toHaveAttribute('aria-pressed', 'false')
    })

    it('persists spacing selection to localStorage', async () => {
      const user = userEvent.setup()
      renderWithProvider()

      await user.click(screen.getByRole('button', { name: /relaxed/i }))

      await waitFor(() => {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        expect(stored.settings?.spacingPreset).toBe('relaxed')
      })
    })
  })
})
