import type { StepConfig } from './wizardConfig'

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
        clipRule="evenodd"
      />
    </svg>
  )
}

interface WizardStepperProps {
  steps: readonly StepConfig[]
  currentStep: number
  onStepClick: (step: number) => void
}

export function WizardStepper({
  steps,
  currentStep,
  onStepClick,
}: WizardStepperProps) {
  return (
    <nav aria-label="Progress">
      {/* Mobile view */}
      <div className="sm:hidden">
        <MobileProgress
          currentStep={currentStep}
          totalSteps={steps.length}
          title={steps[currentStep - 1]?.title ?? ''}
        />
      </div>

      {/* Desktop view */}
      <ol
        role="list"
        className="hidden sm:flex sm:items-center sm:justify-between"
      >
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isLast = index === steps.length - 1

          return (
            <li
              key={step.id}
              className={`relative ${isLast ? '' : 'flex-1 pr-8'}`}
            >
              <div className="flex items-center">
                <StepCircle
                  step={step}
                  isCompleted={isCompleted}
                  isCurrent={isCurrent}
                  onClick={() => onStepClick(step.id)}
                />
                {!isLast && (
                  <div
                    className={`ml-4 h-0.5 flex-1 ${
                      isCompleted ? 'bg-blue-600' : 'bg-slate-200'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={`mt-2 block text-xs font-medium ${
                  isCurrent
                    ? 'text-blue-600'
                    : isCompleted
                      ? 'text-slate-700'
                      : 'text-slate-500'
                }`}
              >
                {step.shortTitle}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

interface StepCircleProps {
  step: StepConfig
  isCompleted: boolean
  isCurrent: boolean
  onClick: () => void
}

function StepCircle({
  step,
  isCompleted,
  isCurrent,
  onClick,
}: StepCircleProps) {
  const baseClasses =
    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'

  if (isCompleted) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} bg-blue-600 text-white hover:bg-blue-700`}
        aria-label={`Go to ${step.title} (completed)`}
      >
        <CheckIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    )
  }

  if (isCurrent) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} border-2 border-blue-600 bg-white text-blue-600`}
        aria-current="step"
        aria-label={`${step.title} (current step)`}
      >
        {step.id}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} border-2 border-slate-300 bg-white text-slate-500 hover:border-slate-400`}
      aria-label={`Go to ${step.title}`}
    >
      {step.id}
    </button>
  )
}

interface MobileProgressProps {
  currentStep: number
  totalSteps: number
  title: string
}

function MobileProgress({
  currentStep,
  totalSteps,
  title,
}: MobileProgressProps) {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-900">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-slate-600">{title}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        />
      </div>
    </div>
  )
}
