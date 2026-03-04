import { useState } from 'react'
import { useCv } from '../../../app/providers'
import type { ExperienceItem } from '../../../core'
import { reorderArray } from '../../../shared/utils'
import { ExperienceForm } from './ExperienceForm'

export function ExperienceSection() {
  const { cv, updateCv } = useCv()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const experiences = cv.experience

  const handleAdd = (data: ExperienceItem) => {
    updateCv(draft => {
      draft.experience = [...(draft.experience || []), data]
    })
    setIsAdding(false)
  }

  const handleUpdate = (data: ExperienceItem) => {
    updateCv(draft => {
      const index = draft.experience.findIndex(e => e.id === data.id)
      if (index !== -1) {
        draft.experience[index] = data
      }
    })
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    updateCv(draft => {
      draft.experience = draft.experience.filter(e => e.id !== id)
    })
  }

  const handleMoveUp = (index: number) => {
    if (index <= 0) return
    updateCv(draft => {
      draft.experience = reorderArray(draft.experience, index, index - 1)
    })
  }

  const handleMoveDown = (index: number) => {
    if (index >= experiences.length - 1) return
    updateCv(draft => {
      draft.experience = reorderArray(draft.experience, index, index + 1)
    })
  }

  return (
    <div className="space-y-4">
      {experiences.length === 0 && !isAdding && (
        <p className="text-sm text-slate-500">No experience entries yet.</p>
      )}

      {experiences.map((exp, index) => (
        <div
          key={exp.id}
          className="rounded-lg border border-slate-200 bg-white p-4"
        >
          {editingId === exp.id ? (
            <ExperienceForm
              experience={exp}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-slate-900">{exp.role}</h3>
                <p className="text-sm text-slate-600">{exp.company}</p>
                <p className="text-sm text-slate-500">
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </p>
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-inside list-disc text-sm text-slate-600">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
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
                  disabled={index === experiences.length - 1}
                  className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(exp.id)}
                  className="rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id)}
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
          <ExperienceForm onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Add Experience
        </button>
      )}
    </div>
  )
}
