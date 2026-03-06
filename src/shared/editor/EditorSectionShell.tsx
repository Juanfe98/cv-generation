import type { ReactNode } from 'react'

interface EditorSectionShellProps {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}

export function EditorSectionShell({
  title,
  description,
  actions,
  children,
}: EditorSectionShellProps) {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      {children}
    </section>
  )
}
