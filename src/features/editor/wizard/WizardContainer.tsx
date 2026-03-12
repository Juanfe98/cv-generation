import { WizardStepper } from './WizardStepper'
import { type StepConfig } from './wizardConfig'
import {
  GettingStartedStep,
  WorkExperienceStep,
  EducationStep,
  SkillsProjectsStep,
  FinishingUpStep,
} from './steps'

interface WizardStepperHeaderProps {
  currentStep: number
  steps: readonly StepConfig[]
  onStepClick: (step: number) => void
}

export function WizardStepperHeader({
  currentStep,
  steps,
  onStepClick,
}: WizardStepperHeaderProps) {
  return (
    <WizardStepper
      steps={steps}
      currentStep={currentStep}
      onStepClick={onStepClick}
    />
  )
}

interface WizardStepContentProps {
  currentStep: number
}

export function WizardStepContent({ currentStep }: WizardStepContentProps) {
  return <StepContent step={currentStep} />
}

function StepContent({ step }: { step: number }) {
  switch (step) {
    case 1:
      return <GettingStartedStep />
    case 2:
      return <WorkExperienceStep />
    case 3:
      return <EducationStep />
    case 4:
      return <SkillsProjectsStep />
    case 5:
      return <FinishingUpStep />
    default:
      return <GettingStartedStep />
  }
}
