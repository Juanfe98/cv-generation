import { useCv } from '../../app/providers'

export function PreviewPage() {
  const { cv } = useCv()
  const displayName = cv.profile.fullName || 'Unnamed'

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">
        Preview: {displayName}
      </h1>
      <p className="mt-2 text-slate-600">Preview your CV here.</p>
      <pre className="mt-4 overflow-auto rounded bg-slate-100 p-4 text-xs">
        {JSON.stringify(cv, null, 2)}
      </pre>
    </div>
  )
}
