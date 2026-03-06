import { useCv } from '../../app/providers'
import { ProfileSection, ExperienceSection, EducationSection } from './components'

export function EditorPage() {
  const { cv, resetCv, isSaving } = useCv()
  const displayName = cv.profile.fullName || 'Unnamed'

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Editor: {displayName}
        </h1>
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-sm text-slate-500">Saving...</span>
          )}
          <button
            onClick={resetCv}
            className="rounded bg-red-100 px-3 py-1 text-sm text-red-700"
          >
            Reset CV
          </button>
        </div>
      </div>
      <p className="mt-2 text-slate-600">Build your CV here.</p>

      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Profile</h2>
        <ProfileSection />
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Experience</h2>
        <ExperienceSection />
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Education</h2>
        <EducationSection />
      </section>

      <pre className="mt-8 overflow-auto rounded bg-slate-100 p-4 text-xs">
        {JSON.stringify(cv, null, 2)}
      </pre>
    </div>
  )
}
