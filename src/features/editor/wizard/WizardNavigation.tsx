import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface WizardNavigationProps {
  onPrevious: () => void
  onNext: () => void
  isFirstStep: boolean
  isLastStep: boolean
  nextStepTitle?: string
}

export function WizardNavigation({
  onPrevious,
  onNext,
  isFirstStep,
  isLastStep,
  nextStepTitle,
}: WizardNavigationProps) {
  const { t } = useTranslation('wizard')
  const { t: tCommon } = useTranslation('common')

  return (
    <div className="flex items-center justify-between">
      {/* Previous - subtle ghost button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-0"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        {t('navigation.back')}
      </button>

      {/* Next - prominent primary button */}
      {isLastStep ? (
        <Link
          to="/preview"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          {tCommon('buttons.preview')} CV
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20"
        >
          {nextStepTitle ? `${t('navigation.next')}: ${nextStepTitle}` : t('navigation.next')}
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  )
}
