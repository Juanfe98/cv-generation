import { useState } from 'react'
import { useCv } from '../../app/providers'
import { ConfirmDialog } from '../../shared/components'
import { SplitLayout } from './SplitLayout'
import {
  useWizardStep,
  WizardStepperHeader,
  WizardStepContent,
  WizardNavigation,
  getStepConfig,
  TOTAL_STEPS,
} from './wizard'

export function EditorPage() {
  const { cv, resetCv, isSaving } = useCv()
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const displayName = cv.profile.fullName || 'Unnamed'
  const {
    currentStep,
    goToStep,
    goNext,
    goPrevious,
    isFirstStep,
    isLastStep,
    steps,
  } = useWizardStep()

  const currentStepConfig = getStepConfig(currentStep)

  return (
    <SplitLayout>
      {/* HEADER (sticky) */}
      <header className="flex-shrink-0 border-b border-slate-200/80 bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5 md:gap-3">
              {/* Step badge - dark treatment matching landing page */}
              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {String(currentStep).padStart(2, '0')}/{String(TOTAL_STEPS).padStart(2, '0')}
              </span>
              <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                {currentStepConfig.title}
              </h1>
            </div>
            {displayName && displayName !== 'Unnamed' && (
              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-500">
                {/* Icon in blue-50 container - brand motif */}
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-50">
                  <svg
                    className="h-3 w-3 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </span>
                {displayName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {/* Saving indicator - emerald accent matching landing success states */}
            {isSaving && (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                <svg
                  className="h-3 w-3 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="hidden sm:inline">Saving</span>
              </span>
            )}
            {/* Start over button */}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span className="hidden sm:inline">Start Over</span>
            </button>
          </div>
        </div>
        <WizardStepperHeader
          currentStep={currentStep}
          steps={steps}
          onStepClick={goToStep}
        />
      </header>

      {/* CONTENT (flex-1, scrollable) */}
      <main className="relative flex-1 overflow-auto bg-gradient-to-b from-slate-50/80 to-slate-100/50">
        {/* Subtle pattern background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative min-h-full p-3 md:p-4">
          {/* Content card with refined framing */}
          <div className="min-h-full rounded-lg border border-slate-200/60 bg-white p-4 shadow-sm md:p-6">
            <WizardStepContent currentStep={currentStep} />
          </div>
        </div>
      </main>

      {/* FOOTER (sticky action bar) */}
      <footer className="flex-shrink-0 border-t border-slate-200/80 bg-white px-4 py-4 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] md:px-6 md:py-5">
        <WizardNavigation
          onPrevious={goPrevious}
          onNext={goNext}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          nextStepTitle={!isLastStep ? getStepConfig(currentStep + 1).shortTitle : undefined}
        />
      </footer>

      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Start Over?"
        message="This will clear all your CV data including personal info, experience, education, and skills. This action cannot be undone."
        confirmLabel="Clear All Data"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={() => {
          resetCv()
          setShowResetConfirm(false)
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </SplitLayout>
  )
}
