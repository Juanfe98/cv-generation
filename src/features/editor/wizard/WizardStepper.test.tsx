import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { WizardStepper } from './WizardStepper'
import { getWizardSteps } from './wizardConfig'

describe('WizardStepper', () => {
  const wizardSteps = getWizardSteps()
  const defaultProps = {
    steps: wizardSteps,
    currentStep: 1,
    onStepClick: vi.fn(),
  }

  describe('desktop view', () => {
    it('renders all steps', () => {
      render(<WizardStepper {...defaultProps} />)

      wizardSteps.forEach(step => {
        expect(screen.getByText(step.shortTitle)).toBeInTheDocument()
      })
    })

    it('marks current step with aria-current', () => {
      render(<WizardStepper {...defaultProps} currentStep={3} />)

      const currentButton = screen.getByRole('button', { name: /current step/i })
      expect(currentButton).toHaveAttribute('aria-current', 'step')
    })

    it('shows completed steps with checkmark', () => {
      render(<WizardStepper {...defaultProps} currentStep={3} />)

      const completedButtons = screen.getAllByRole('button', {
        name: /completed/i,
      })
      expect(completedButtons).toHaveLength(2)
    })

    it('calls onStepClick when step is clicked', () => {
      const onStepClick = vi.fn()
      render(<WizardStepper {...defaultProps} onStepClick={onStepClick} />)

      const stepButton = screen.getByRole('button', { name: /go to education/i })
      fireEvent.click(stepButton)

      expect(onStepClick).toHaveBeenCalledWith(3)
    })

    it('allows clicking on completed steps', () => {
      const onStepClick = vi.fn()
      render(
        <WizardStepper
          {...defaultProps}
          currentStep={4}
          onStepClick={onStepClick}
        />
      )

      const completedStep = screen.getByRole('button', {
        name: /start.*completed/i,
      })
      fireEvent.click(completedStep)

      expect(onStepClick).toHaveBeenCalledWith(1)
    })
  })

  describe('mobile view', () => {
    it('shows step count', () => {
      render(<WizardStepper {...defaultProps} currentStep={2} />)

      expect(screen.getByText(/step 2 of 5/i)).toBeInTheDocument()
    })

    it('shows current step title', () => {
      render(<WizardStepper {...defaultProps} currentStep={2} />)

      expect(screen.getByText('Work Experience')).toBeInTheDocument()
    })

    it('renders progress bar', () => {
      render(<WizardStepper {...defaultProps} currentStep={3} />)

      const progressBar = screen.getByRole('progressbar')
      expect(progressBar).toHaveAttribute('aria-valuenow', '3')
      expect(progressBar).toHaveAttribute('aria-valuemax', '5')
    })
  })
})
