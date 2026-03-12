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
                    className={`ml-4 h-1 flex-1 rounded-full transition-colors duration-300 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={`mt-2.5 block text-xs tracking-wide ${
                  isCurrent
                    ? 'font-bold text-blue-700'
                    : isCompleted
                      ? 'font-semibold text-emerald-600'
                      : 'font-medium text-slate-400'
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
    'flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'

  if (isCompleted) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} h-9 w-9 bg-emerald-500 text-sm text-white shadow-sm hover:bg-emerald-600 hover:shadow-md`}
        aria-label={`Go to ${step.title} (completed)`}
      >
        <CheckIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    )
  }

  if (isCurrent) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} h-11 w-11 border-2 border-blue-600 bg-blue-600 text-base text-white shadow-lg ring-4 ring-blue-100`}
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
      className={`${baseClasses} h-9 w-9 border-2 border-slate-200 bg-slate-50 text-sm text-slate-400 hover:border-slate-300 hover:bg-white`}
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
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-bold text-blue-700">{title}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 transition-all duration-300"
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
