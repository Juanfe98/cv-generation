import { useWizardStep } from './useWizardStep'
import { WizardStepper } from './WizardStepper'
import { WizardNavigation } from './WizardNavigation'
import {
  GettingStartedStep,
  WorkExperienceStep,
  EducationStep,
  SkillsProjectsStep,
  FinishingUpStep,
} from './steps'

export function WizardContainer() {
  const {
    currentStep,
    goToStep,
    goNext,
    goPrevious,
    isFirstStep,
    isLastStep,
    steps,
  } = useWizardStep()

  return (
    <div className="space-y-8">
      <WizardStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <div className="min-h-[400px]">
        <StepContent step={currentStep} />
      </div>

      <WizardNavigation
        onPrevious={goPrevious}
        onNext={goNext}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  )
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
