import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { LanguageItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { LanguageForm } from './LanguageForm'

export function LanguageSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const languages = cv.languages

  const handleAdd = (data: LanguageItem) => {
    updateCv(draft => {
      draft.languages = [...(draft.languages || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: LanguageItem) => {
    updateCv(draft => {
      const index = draft.languages.findIndex(l => l.id === data.id)
      if (index !== -1) {
        draft.languages[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.languages = draft.languages.filter(l => l.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.languages = reorderArray(draft.languages, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= languages.length - 1) return
    updateCv(draft => {
      draft.languages = reorderArray(draft.languages, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {languages.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">No languages added yet.</p>
      )}

      {languages.map((lang, index) => (
        <div
          key={lang.id}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          {editingId === lang.id ? (
            <LanguageForm
              language={lang}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">
                  {lang.name}
                  {lang.level && (
                    <span className="font-normal text-slate-500"> — {lang.level}</span>
                  )}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === languages.length - 1}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(lang.id)}
                  className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(lang.id)}
                  className="rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isAdding ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <LanguageForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Language
        </button>
      )}
    </div>
  )
}
