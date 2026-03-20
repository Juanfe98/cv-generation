import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSwitcher } from './LanguageSwitcher'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  it('renders with default variant', () => {
    render(<LanguageSwitcher />)

    // Should show current language (English)
    expect(screen.getByText('English')).toBeInTheDocument()
  })

  it('renders with compact variant', () => {
    render(<LanguageSwitcher variant="compact" />)

    // Should have a button with globe icon
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button')
    await user.click(button)

    // Should show both language options
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <LanguageSwitcher />
        <div data-testid="outside">Outside</div>
      </div>
    )

    // Open dropdown
    const button = screen.getByRole('button')
    await user.click(button)
    expect(screen.getByText('Español')).toBeInTheDocument()

    // Click outside
    const outside = screen.getByTestId('outside')
    fireEvent.mouseDown(outside)

    // Dropdown should be closed
    expect(screen.queryByText('Español')).not.toBeInTheDocument()
  })

  it('persists language selection to localStorage', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    const button = screen.getByRole('button')
    await user.click(button)

    const spanishOption = screen.getByText('Español')
    await user.click(spanishOption)

    expect(localStorageMock.getItem('cv-generator:language')).toBe('es')
  })
})
