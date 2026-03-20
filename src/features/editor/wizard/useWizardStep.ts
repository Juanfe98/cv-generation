import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  TOTAL_STEPS,
  getStepConfig,
  getWizardSteps,
  isValidStep,
  type StepConfig,
} from './wizardConfig'

const STEP_PARAM = 'step'

export interface UseWizardStepReturn {
  currentStep: number
  goToStep: (step: number) => void
  goNext: () => void
  goPrevious: () => void
  isFirstStep: boolean
  isLastStep: boolean
  stepConfig: StepConfig
  totalSteps: number
  steps: readonly StepConfig[]
}

export function useWizardStep(): UseWizardStepReturn {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentStep = useMemo(() => {
    const stepParam = searchParams.get(STEP_PARAM)
    if (!stepParam) return 1

    const parsed = parseInt(stepParam, 10)
    if (isNaN(parsed) || !isValidStep(parsed)) return 1

    return parsed
  }, [searchParams])

  const goToStep = useCallback(
    (step: number) => {
      if (!isValidStep(step)) return

      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev)
        newParams.set(STEP_PARAM, String(step))
        return newParams
      })
    },
    [setSearchParams]
  )

  const goNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1)
    }
  }, [currentStep, goToStep])

  const goPrevious = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1)
    }
  }, [currentStep, goToStep])

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === TOTAL_STEPS
  const stepConfig = getStepConfig(currentStep)

  // Get translated steps at render time
  const steps = useMemo(() => getWizardSteps(), [])

  return {
    currentStep,
    goToStep,
    goNext,
    goPrevious,
    isFirstStep,
    isLastStep,
    stepConfig,
    totalSteps: TOTAL_STEPS,
    steps,
  }
}
