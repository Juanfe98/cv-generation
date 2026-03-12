import { LanguageSection } from '../../components'

export function FinishingUpStep() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Languages</h2>
      <p className="mb-6 text-sm text-slate-600">
        Add languages you speak and your proficiency level.
      </p>
      <LanguageSection />
    </div>
  )
}
