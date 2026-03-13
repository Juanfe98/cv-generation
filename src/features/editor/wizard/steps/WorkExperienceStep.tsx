import { ExperienceSection } from '../../components'

export function WorkExperienceStep() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Work Experience
      </h2>
      <p className="mb-6 text-sm text-slate-600">
        Add your professional experience. Most recent positions first.
      </p>
      <ExperienceSection />
    </div>
  )
}
