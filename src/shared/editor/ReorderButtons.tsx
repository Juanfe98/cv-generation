interface ReorderButtonsProps {
  onMoveUp: () => void
  onMoveDown: () => void
  disabledUp?: boolean
  disabledDown?: boolean
}

export function ReorderButtons({
  onMoveUp,
  onMoveDown,
  disabledUp = false,
  disabledDown = false,
}: ReorderButtonsProps) {
  return (
    <>
      <button
        type="button"
        onClick={onMoveUp}
        disabled={disabledUp}
        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Move up"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={disabledDown}
        className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Move down"
      >
        ↓
      </button>
    </>
  )
}
