interface MobileViewToggleProps {
  value: 'editor' | 'preview'
  onChange: (view: 'editor' | 'preview') => void
}

export function MobileViewToggle({ value, onChange }: MobileViewToggleProps) {
  return (
    <div className="flex border-b border-slate-200 md:hidden">
      <button
        type="button"
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          value === 'editor'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => onChange('editor')}
      >
        Editor
      </button>
      <button
        type="button"
        className={`flex-1 py-3 text-sm font-medium transition-colors ${
          value === 'preview'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => onChange('preview')}
      >
        Preview
      </button>
    </div>
  )
}
