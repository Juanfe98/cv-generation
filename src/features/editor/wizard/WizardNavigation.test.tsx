import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { WizardNavigation } from './WizardNavigation'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('WizardNavigation', () => {
  const defaultProps = {
    onPrevious: vi.fn(),
    onNext: vi.fn(),
    isFirstStep: false,
    isLastStep: false,
  }

  it('renders Back and Next buttons', () => {
    renderWithRouter(<WizardNavigation {...defaultProps} />)

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument()
  })

  it('disables Back button on first step', () => {
    renderWithRouter(<WizardNavigation {...defaultProps} isFirstStep={true} />)

    expect(screen.getByRole('button', { name: /back/i })).toBeDisabled()
  })

  it('enables Back button on non-first steps', () => {
    renderWithRouter(<WizardNavigation {...defaultProps} isFirstStep={false} />)

    expect(screen.getByRole('button', { name: /back/i })).toBeEnabled()
  })

  it('calls onPrevious when Back button is clicked', () => {
    const onPrevious = vi.fn()
    renderWithRouter(
      <WizardNavigation {...defaultProps} onPrevious={onPrevious} />
    )

    fireEvent.click(screen.getByRole('button', { name: /back/i }))

    expect(onPrevious).toHaveBeenCalled()
  })

  it('calls onNext when Next button is clicked', () => {
    const onNext = vi.fn()
    renderWithRouter(<WizardNavigation {...defaultProps} onNext={onNext} />)

    fireEvent.click(screen.getByRole('button', { name: /next/i }))

    expect(onNext).toHaveBeenCalled()
  })

  it('shows Preview CV link on last step', () => {
    renderWithRouter(<WizardNavigation {...defaultProps} isLastStep={true} />)

    expect(screen.getByRole('link', { name: /preview.*cv/i })).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /next/i })
    ).not.toBeInTheDocument()
  })

  it('Preview CV link points to /preview', () => {
    renderWithRouter(<WizardNavigation {...defaultProps} isLastStep={true} />)

    const link = screen.getByRole('link', { name: /preview.*cv/i })
    expect(link).toHaveAttribute('href', '/preview')
  })
})
