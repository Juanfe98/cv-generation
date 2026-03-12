import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useWizardStep } from './useWizardStep'
import { WIZARD_STEPS, TOTAL_STEPS } from './wizardConfig'

function createWrapper(initialEntries: string[] = ['/editor']) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    )
  }
}

describe('useWizardStep', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('initial state', () => {
    it('defaults to step 1 when no query param', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor']),
      })

      expect(result.current.currentStep).toBe(1)
    })

    it('reads step from query param', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=3']),
      })

      expect(result.current.currentStep).toBe(3)
    })

    it('defaults to 1 for invalid step param', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=invalid']),
      })

      expect(result.current.currentStep).toBe(1)
    })

    it('defaults to 1 for out of range step param', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=10']),
      })

      expect(result.current.currentStep).toBe(1)
    })
  })

  describe('navigation', () => {
    it('goToStep updates current step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor']),
      })

      act(() => {
        result.current.goToStep(3)
      })

      expect(result.current.currentStep).toBe(3)
    })

    it('goToStep ignores invalid step numbers', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=2']),
      })

      act(() => {
        result.current.goToStep(10)
      })

      expect(result.current.currentStep).toBe(2)
    })

    it('goNext increments step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=2']),
      })

      act(() => {
        result.current.goNext()
      })

      expect(result.current.currentStep).toBe(3)
    })

    it('goNext does nothing on last step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=5']),
      })

      act(() => {
        result.current.goNext()
      })

      expect(result.current.currentStep).toBe(5)
    })

    it('goPrevious decrements step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=3']),
      })

      act(() => {
        result.current.goPrevious()
      })

      expect(result.current.currentStep).toBe(2)
    })

    it('goPrevious does nothing on first step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=1']),
      })

      act(() => {
        result.current.goPrevious()
      })

      expect(result.current.currentStep).toBe(1)
    })
  })

  describe('computed values', () => {
    it('isFirstStep is true on step 1', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=1']),
      })

      expect(result.current.isFirstStep).toBe(true)
    })

    it('isFirstStep is false on other steps', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=3']),
      })

      expect(result.current.isFirstStep).toBe(false)
    })

    it('isLastStep is true on last step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=5']),
      })

      expect(result.current.isLastStep).toBe(true)
    })

    it('isLastStep is false on other steps', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=2']),
      })

      expect(result.current.isLastStep).toBe(false)
    })

    it('returns correct stepConfig for current step', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor?step=4']),
      })

      expect(result.current.stepConfig.id).toBe(4)
      expect(result.current.stepConfig.slug).toBe('skills-projects')
    })

    it('totalSteps equals TOTAL_STEPS', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor']),
      })

      expect(result.current.totalSteps).toBe(TOTAL_STEPS)
    })

    it('steps equals WIZARD_STEPS', () => {
      const { result } = renderHook(() => useWizardStep(), {
        wrapper: createWrapper(['/editor']),
      })

      expect(result.current.steps).toEqual(WIZARD_STEPS)
    })
  })
})
