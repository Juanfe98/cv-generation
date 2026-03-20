import { Link } from 'react-router-dom'
import { useReveal } from '../hooks'

// Template preview components - each with unique layout
function ClassicPreview() {
  return (
    <div className="h-full w-full space-y-3 p-3">
      {/* Header - centered */}
      <div className="text-center">
        <div className="mx-auto h-2.5 w-24 rounded bg-slate-800" />
        <div className="mx-auto mt-1.5 h-1.5 w-16 rounded bg-slate-400" />
      </div>
      {/* Contact - centered */}
      <div className="flex justify-center gap-2">
        <div className="h-1 w-12 rounded bg-slate-200" />
        <div className="h-1 w-12 rounded bg-slate-200" />
      </div>
      {/* Sections */}
      <div className="space-y-2.5 border-t border-slate-200 pt-2.5">
        <div>
          <div className="h-1.5 w-16 rounded bg-slate-600" />
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-5/6 rounded bg-slate-100" />
          </div>
        </div>
        <div>
          <div className="h-1.5 w-14 rounded bg-slate-600" />
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-4/6 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ModernPreview() {
  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <div className="w-1/3 space-y-2.5 bg-slate-50 p-2.5">
        <div className="h-2 w-12 rounded bg-blue-500" />
        <div className="h-1 w-full rounded bg-slate-200" />
        <div className="h-1 w-4/5 rounded bg-slate-200" />
        <div className="mt-2 h-1.5 w-10 rounded bg-blue-400" />
        <div className="mt-1 flex flex-wrap gap-1">
          <div className="h-3 w-6 rounded-full bg-slate-200" />
          <div className="h-3 w-8 rounded-full bg-slate-200" />
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 space-y-2.5 p-2.5">
        <div>
          <div className="h-2 w-16 rounded border-b border-blue-500 bg-blue-600" />
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-5/6 rounded bg-slate-100" />
            <div className="h-1 w-4/6 rounded bg-slate-100" />
          </div>
        </div>
        <div>
          <div className="h-2 w-14 rounded border-b border-blue-500 bg-blue-600" />
          <div className="mt-1.5 space-y-1">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-3/4 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ExecutivePreview() {
  return (
    <div className="h-full w-full p-3">
      {/* Header with accent line */}
      <div className="border-b-2 border-amber-500 pb-2">
        <div className="h-2.5 w-20 rounded bg-slate-800" />
        <div className="mt-1 flex gap-2">
          <div className="h-1 w-10 rounded bg-slate-300" />
          <div className="h-1 w-10 rounded bg-slate-300" />
        </div>
      </div>
      {/* Two columns */}
      <div className="mt-2.5 flex gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-1.5 w-14 rounded bg-amber-600" />
          <div className="space-y-1">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-5/6 rounded bg-slate-100" />
            <div className="h-1 w-4/6 rounded bg-slate-100" />
          </div>
        </div>
        <div className="w-1/3 space-y-2">
          <div className="h-1.5 w-10 rounded bg-amber-600" />
          <div className="space-y-1">
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-3/4 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CreativePreview() {
  return (
    <div className="h-full w-full">
      {/* Bold header */}
      <div className="bg-violet-600 p-2.5">
        <div className="h-2.5 w-16 rounded bg-white" />
        <div className="mt-1 h-1.5 w-20 rounded bg-violet-300" />
      </div>
      {/* Content with accent blocks */}
      <div className="space-y-2 p-2.5">
        <div className="flex items-start gap-2">
          <div className="h-4 w-1 rounded-full bg-violet-400" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-12 rounded bg-violet-500" />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-4/5 rounded bg-slate-100" />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="h-4 w-1 rounded-full bg-violet-400" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 w-10 rounded bg-violet-500" />
            <div className="h-1 w-full rounded bg-slate-100" />
            <div className="h-1 w-3/5 rounded bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  )
}

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column layout. Clean and timeless.',
    badge: 'ATS-Friendly',
    preview: <ClassicPreview />,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column design with sidebar. Contemporary and organized.',
    badge: 'Most Popular',
    preview: <ModernPreview />,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Refined layout for senior roles. Sophisticated presence.',
    badge: null,
    preview: <ExecutivePreview />,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold design for creative fields. Stand out visually.',
    badge: null,
    preview: <CreativePreview />,
  },
]

export function TemplateShowcase() {
  const { ref, isVisible } = useReveal<HTMLElement>()

  return (
    <section ref={ref} id="templates" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
            Templates
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Designs that make an impression
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Professional templates crafted to highlight your strengths and pass
            applicant tracking systems.
          </p>
        </div>

        {/* Templates grid */}
        <div
          className={`mt-16 grid gap-6 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 ${
            isVisible ? 'stagger-children visible' : 'stagger-children'
          }`}
        >
          {templates.map((template) => (
            <Link
              key={template.id}
              to="/editor"
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-xl focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              aria-label={`${template.name} template${template.badge ? ` - ${template.badge}` : ''}: ${template.description}`}
            >
              {/* Badge */}
              {template.badge && (
                <div className="absolute right-3 top-3 z-10">
                  <span className="rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
                    {template.badge}
                  </span>
                </div>
              )}

              {/* Preview area */}
              <div className="relative bg-slate-100 p-4">
                <div className="aspect-[8.5/11] overflow-hidden rounded-lg border border-slate-200/60 bg-white shadow-sm transition-transform group-hover:scale-[1.02] group-focus-visible:scale-[1.02]">
                  {template.preview}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-blue-600 group-focus-visible:text-blue-600">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {template.description}
                </p>

                {/* Action indicator - visible on hover and focus */}
                <div className="mt-3 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span>Use this template</span>
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Template hint */}
        <p className="mt-6 text-center text-sm text-slate-400">
          <span className="hidden sm:inline">
            Click any template to start building your CV
          </span>
        </p>
      </div>
    </section>
  )
}
