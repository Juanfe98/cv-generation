import {
  ProfileSection,
  TemplateSelector,
  ThemeCustomizer,
} from '../../components'

export function GettingStartedStep() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Profile</h2>
        <ProfileSection />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Template</h2>
        <TemplateSelector />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Theme</h2>
        <ThemeCustomizer />
      </section>
    </div>
  )
}
