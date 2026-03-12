import { useCv } from '../../app/providers'
import { SplitLayout } from './SplitLayout'
import { WizardContainer } from './wizard'

export function EditorPage() {
  const { cv, resetCv, isSaving } = useCv()
  const displayName = cv.profile.fullName || 'Unnamed'

  return (
    <SplitLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
          {displayName || 'Your CV'}
        </h1>
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-sm text-slate-500">Saving...</span>
          )}
          <button
            onClick={resetCv}
            className="rounded bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6">
        <WizardContainer />
      </div>
    </SplitLayout>
  )
}
