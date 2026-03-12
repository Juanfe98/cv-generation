import { SkillsSection, ProjectSection } from '../../components'

export function SkillsProjectsStep() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Skills</h2>
        <p className="mb-6 text-sm text-slate-600">
          List your technical and professional skills.
        </p>
        <SkillsSection />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Projects</h2>
        <p className="mb-6 text-sm text-slate-600">
          Showcase your notable projects and achievements.
        </p>
        <ProjectSection />
      </section>
    </div>
  )
}
