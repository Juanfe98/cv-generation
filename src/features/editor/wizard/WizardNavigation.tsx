import { Link } from 'react-router-dom'

interface WizardNavigationProps {
  onPrevious: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function WizardNavigation({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
}: WizardNavigationProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-200 pt-6">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {isLastStep ? (
        <Link
          to="/preview"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Preview CV
        </Link>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Next
        </button>
      )}
    </div>
  )
}
