interface ActionButtonProps {
  onClick: () => void
}

export function EditButton({ onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
    >
      Edit
    </button>
  )
}

export function DeleteButton({ onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  )
}
