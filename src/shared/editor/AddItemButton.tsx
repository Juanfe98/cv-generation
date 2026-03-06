import type { ReactNode } from 'react'

interface AddItemButtonProps {
  onClick: () => void
  children: ReactNode
}

export function AddItemButton({ onClick, children }: AddItemButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      {children}
    </button>
  )
}
