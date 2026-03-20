interface MobileViewToggleProps {
  value: 'editor' | 'preview'
  onChange: (view: 'editor' | 'preview') => void
}

function EditorIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  )
}

function PreviewIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

export function MobileViewToggle({ value, onChange }: MobileViewToggleProps) {
  return (
    <div className="flex border-b border-slate-200/60 bg-gradient-to-b from-white to-slate-50/50 md:hidden">
      <button
        type="button"
        className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
          value === 'editor'
            ? 'text-blue-600'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => onChange('editor')}
      >
        <EditorIcon className="h-4 w-4" />
        <span>Editor</span>
        {value === 'editor' && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-blue-600" />
        )}
      </button>
      <button
        type="button"
        className={`relative flex flex-1 items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
          value === 'preview'
            ? 'text-blue-600'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        onClick={() => onChange('preview')}
      >
        <PreviewIcon className="h-4 w-4" />
        <span>Preview</span>
        {value === 'preview' && (
          <span className="absolute bottom-0 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-blue-600" />
        )}
      </button>
    </div>
  )
}
