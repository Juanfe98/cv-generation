import type { CvModel } from '../../../core/cv/types'

interface PlaceholderTemplateProps {
  cv: CvModel
}

export function PlaceholderTemplate({ cv }: PlaceholderTemplateProps) {
  return (
    <article className="mx-auto max-w-[800px] bg-white p-8">
      <div className="flex flex-col items-center justify-center py-16">
        <span className="mb-4 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
          Coming Soon
        </span>
        <h2 className="text-xl font-semibold text-slate-700">
          Template Under Development
        </h2>
        <p className="mt-2 text-slate-500">
          This template is coming in a future update.
        </p>
        <p className="mt-4 text-sm text-slate-400">
          Preview for: {cv.profile.fullName || 'Unnamed'}
        </p>
      </div>
    </article>
  )
}
