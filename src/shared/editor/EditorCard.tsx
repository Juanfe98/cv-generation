import type { ReactNode } from 'react'

interface EditorCardProps {
  children: ReactNode
}

interface EditorCardHeaderProps {
  left: ReactNode
  right: ReactNode
}

function EditorCardHeader({ left, right }: EditorCardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">{left}</div>
      <div className="flex items-center gap-1">{right}</div>
    </div>
  )
}

export function EditorCard({ children }: EditorCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      {children}
    </div>
  )
}

EditorCard.Header = EditorCardHeader
