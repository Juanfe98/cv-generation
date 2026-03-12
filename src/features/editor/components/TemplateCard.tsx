import type { TemplateInfo } from '../../preview/templates'
import type { TemplateCategory, LayoutType } from '../../../core/cv/types'

interface TemplateCardProps {
  template: TemplateInfo
  isSelected: boolean
  onSelect: () => void
}

const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  modern: 'Modern',
  'ats-friendly': 'ATS-Friendly',
  creative: 'Creative',
}

const LAYOUT_LABELS: Record<LayoutType, string> = {
  'one-column': '1 Column',
  'two-column': '2 Columns',
  sidebar: 'Sidebar',
}

const PLACEHOLDER_COLORS: Record<string, string> = {
  classic: 'bg-slate-100',
  modern: 'bg-blue-50',
  executive: 'bg-amber-50',
  creative: 'bg-violet-50',
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const placeholderColor = PLACEHOLDER_COLORS[template.id] || 'bg-slate-100'

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative flex flex-col overflow-hidden rounded-lg border-2 text-left transition-all ${
        isSelected
          ? 'border-blue-500 ring-2 ring-blue-200'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Placeholder thumbnail */}
      <div className={`aspect-[8.5/11] w-full ${placeholderColor} p-4`}>
        <div className="flex h-full flex-col gap-2">
          {/* Simulated header */}
          <div className="h-4 w-2/3 rounded bg-slate-300/50" />
          <div className="h-2 w-1/2 rounded bg-slate-300/30" />
          {/* Simulated sections */}
          <div className="mt-3 h-2 w-full rounded bg-slate-300/30" />
          <div className="h-2 w-full rounded bg-slate-300/30" />
          <div className="h-2 w-3/4 rounded bg-slate-300/30" />
          <div className="mt-2 h-2 w-full rounded bg-slate-300/30" />
          <div className="h-2 w-5/6 rounded bg-slate-300/30" />
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1">
          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Info section */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-semibold text-slate-900">{template.displayName}</h3>
        <p className="text-sm text-slate-500 line-clamp-2">{template.description}</p>

        {/* Badges */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {CATEGORY_LABELS[template.category]}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {LAYOUT_LABELS[template.layoutType]}
          </span>
        </div>
      </div>
    </button>
  )
}
