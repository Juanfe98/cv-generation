import { usePersistedCv } from '../../shared/hooks'

export function EditorPage() {
  const [cv, , { reset, isSaving }] = usePersistedCv()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Editor</h1>
        <div className="flex items-center gap-2">
          {isSaving && (
            <span className="text-sm text-slate-500">Saving...</span>
          )}
          <button
            onClick={reset}
            className="rounded bg-red-100 px-3 py-1 text-sm text-red-700"
          >
            Reset CV
          </button>
        </div>
      </div>
      <p className="mt-2 text-slate-600">Build your CV here.</p>
      <pre className="mt-4 overflow-auto rounded bg-slate-100 p-4 text-xs">
        {JSON.stringify(cv, null, 2)}
      </pre>
    </div>
  )
}
