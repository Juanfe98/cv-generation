import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('wizard')
  const { t: tCommon } = useTranslation('common')
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
      <header className="flex-shrink-0 border-b border-slate-200 bg-white p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">
                {t('navigation.stepOf', { current: currentStep, total: TOTAL_STEPS })}
              </span>
              <span className="text-slate-300">•</span>
              <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
                {currentStepConfig.title}
              </h1>
            </div>
            {displayName && displayName !== 'Unnamed' && (
              <p className="mt-1 text-sm text-slate-500">
                {displayName}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isSaving && (
              <span className="text-sm text-slate-500">{tCommon('status.saving')}</span>
            )}
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-sm text-slate-400 hover:text-slate-600"
            >
              {tCommon('buttons.delete')}
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
      <main className="flex-1 overflow-auto bg-slate-50 pt-4 md:pt-5">
        <div className="min-h-full bg-white p-4 md:p-6">
          <WizardStepContent currentStep={currentStep} />
        </div>
      </main>

      {/* FOOTER (sticky action bar) */}
      <footer className="flex-shrink-0 border-t border-slate-200 bg-white px-4 py-4 md:px-6 md:py-5">
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
        title={tCommon('dialog.confirmDeleteTitle')}
        message={tCommon('dialog.confirmDelete')}
        confirmLabel={tCommon('buttons.confirm')}
        cancelLabel={tCommon('buttons.cancel')}
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
