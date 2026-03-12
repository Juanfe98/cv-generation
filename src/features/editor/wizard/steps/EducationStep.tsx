import { EducationSection, CertificationSection } from '../../components'

export function EducationStep() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Education</h2>
        <p className="mb-6 text-sm text-slate-600">
          Add your educational background, starting with the most recent.
        </p>
        <EducationSection />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Certifications
        </h2>
        <p className="mb-6 text-sm text-slate-600">
          Add any relevant certifications or professional credentials.
        </p>
        <CertificationSection />
      </section>
    </div>
  )
}
